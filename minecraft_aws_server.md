---
layout: default
---
## How to host a Minecraft Server on AWS

Creating servers, writing code, saving money, and playing Minecraft are all fun, so let's do all of it in this tutorial. I'll cover how to use an AWS EC2 (Elastic Compute Cloud) server instance to host a Minecraft Server. I'll then go into how to use Lambda Functions and CloudWatch Events to schedule your EC2 instance to only run during peak crafting hours. You'll learn some basics of the AWS architecture and have your very own Minecraft Server whenver you want.

### Setting up AWS Account
First things first, you will need an AWS account. It's easy to setup over at [AWS](http://aws.com). You will need to enter a credit card for billing, but, depending on the resources you use in this tutorial, it will not cost you anything.

### Provisioning an EC2 Instance
EC2 (or Elastic Compute Cloud) is the bedrock of all AWS services. This will be where we set up our configure, launch, and manage our server. Click on Services > EC2 to open the EC2 console. On the left hand side should be an "Instances" tab. Click on that and then "Launch Instance" to bring up all the options.

#### AMI
Your first choice is the AMI, or Amazon Machine Image. Here you can specify what you instance will have on startup including OS and software. I went with the basic "Amazon Linux 2 AMI (HVM), SSD Volume Type" (the one that is recommended), and it's been working well. If you have some strong inclination for another one go ahead, but don't choose a Windows AMI.

#### Instance Type
The instance type specifies the specifications of the server including processing power (in terms of # of virtual CPUs), memory, and network performance. If you wish to do the free build, select the t2.micro instance with 1 vCPU and 1 [GiB](https://en.wikipedia.org/wiki/Gibibyte) of RAM. In my experience, this will struggle to host even a handful of Minecraft players, due to both the processing and memory constraints. Again, if you are just looking for something free, go with the t2.micro as you can run a single instance for free under the AWS free tier.

If you are looking to host a few buddies and have some decent performance, we need to upgrade the specs a little bit. From toying around, I have seen that 2 vCPUs and a 4 GiB machine is adequate to host at least 5 of my friends at the same time. (It's possible it could do more. That's the max load I've tested and I'm no Minecraft expert.) We can look at [this](https://calculator.aws/#/configureEc2) super helpful website over on AWS. It will help us choose what instance to use based on our needs. If you enter 2 vCPUs and 4 GiB of memory, it recommends a t3a.xlarge instance. This gives me an estimated cost of $0.0376 per hour which is $0.0376 \* 24 \* 31 = $27.97 per month. Later on we'll discuss how to make this cheaper using *Lambda* functions.

#### The Rest

After selecting your instance type, you can click through the rest of the screens to create your instance. You will be prompted to download your keypair. Name it something like minecraft_server_key.pem and download it somewhere you'll remember. ($HOME/.ssh would be good.)

Once that is all done, you will have your very own server!

#### Security Groups

We have one little task left before leaving the AWS console. Right now, our server will let us access it using ssh and our special key, but we want to be able to access it using Minecraft, which is typically hosted on port 25565. To allow such inbound requests, we will make a Security Group.

On the right hand side of the console, under NETWORK & SECURITY, select "Security Groups". At the top, select "Create Security Group". Name it something like minecraft_server_group and give it a brief description. We need to add an inbound rule that allows connections over port 25565. To do this click "Add Rule" under the Inbound tab. You will need to enter the following settings: Type > Custom TCP Rule, Protocol > TCP, Port Range > 25565, Source > Anywhere. When you enter "Anywhere" for source, it should autofill the adjacent box with "0.0.0.0/0, ::/0". Click "Create".

The security group that we just created will allow clients to access the server only on port 25565 with a TCP connection. This is the port the Minecraft server will be hosted on.

Now navigate back to the your instances. To assign your instance to the security group you just created: select your instance from the table, click "Actions" at the top, Networking > "Change Security Groups". At this prompt, check the security group you just created. This means you should have two security groups selected, your launch-wizard group and your minecraft group. Click "Assign Security Groups".

### Loggin' In

Now that we have our server set up, we need to log in to get the Minecraft server started. Before leaving the EC2 screen, make note of the IPv4 Public IP of the instance.

Open up your favorite terminal of choice and head over to your directory with your .pem file. Once there you can run the following command:

`ssh -i minecraft_server_key.pem ec2-user@<your IPv4 address>`

If your system complains that the permissions are too open for your .pem file, you can run the chmod command to remedy that:

`chmod 600 minecraft_server_key.pem`

With that you should be greeted by the friendly EC2 bash logo. You are now operating within your remote EC2 instance.

### The Minecraft Server

#### Setting up

As you probably know, Minecraft is built with Java. Unfortunately, our instance doesn't come with that preinstalled. First thing to do is to download Java with:

`sudo yum install java`

Once that is installed, let's prepare our environment. We can create a directory for all of our files. Create one and change directories with:

`mkdir MinecraftServer && cd MinecraftServer`

Now we can download the Minecraft Server with the following command:

`wget https://launcher.mojang.com/v1/objects/808be3869e2ca6b62378f9f4b33c946621620019/server.jar`

This includes downloads a file called server.jar to your current directory. You'll want to replace the link with the most current version of the Minecraft Server. At the time of writing, the most recent update is [1.14.2](https://minecraft.gamepedia.com/Java_Edition_1.14.2) which is what the previous command will download. If you are this in the future, you can go to the [official download page](https://www.minecraft.net/en-us/download/server/) to find the newest one. To get the download link that wget requires, you'll want to right click on the download button and open that link in a new tab. Don't download the .jar directly. Instead, copy the address of the new tab to paste after wget like: `wget <the copied link>`

We are close to starting up our Minecraft server.

You'll now want to execute the server.jar with the java command.

`java -Xmx<YOUR MEMORY SIZE> -Xms<YOUR MEMORY SIZE> -jar server.jar nogui`

The `-Xmx` and `-Xms` tags tell java how much memory to allocate to the heap at a maximum and initially, respectively. Depending on the instance you chose, you'll want to set this differently. On the t2.micro, you only have a maximum of 1 GiB of memory available. You can set it to `512M` which represents 512 megabytes of memory. On my t3a.medium, I run it with `3G` which represents 3 gigabytes of memory. I don't max out the memory of the instance with just the Minecraft server. I'm not sure what would happen if you did. My guess would be that you would see some heavy CPU usage as it hangs on an overloaded memory bus, but we are getting too into the weeds.

So run the server with something like:

`java -Xmx512M -Xms512M -jar server.jar nogui`

This won't start the server quite yet. It will fail because we haven't agreed to the **E**nd **U**ser **L**icense **A**greement (eula). The file we need to modify has just been created as `./eula.txt`. You can open this with:

`vim eula.txt`

This will open the file in the vim text editor. We need to change the final line `eula=false` to `eula=true`. If you know what you are doing in vim, you can skip this paragraph. To do this quickly, type `GA` to go to the end of the last line and jump into insert mode. Then delete, like a normal editor, hit backspace to delete `false` and replace it with `true`. Then, to exit and save type `Esc` (as in the escape button) and then `:wq`. Whew, we are done with vim. Note: vim is a super useful tool, and if you want to dive deep into Linux and other great tools, you should take a little bit of time to get the basics of vim down.

Now you can finally start the Minecraft server. Reenter you previous command:

`java -Xmx<YOUR MEMORY SIZE> -Xms<YOUR MEMORY SIZE> -jar server.jar nogui`

A bunch of Minecraft logs will start spitting out. 

#### Testing

Fire up Minecraft and head over to Multiplayer. Click "Add Server" and then under "Server Address", paste the IPv4 address of your instance followed by ":25565". Click "Done" and you should see the world slowly build. Back over on your instance, you should see some live logs indicating that a new player (you) has logged in. Success! You can type "/say Hello from the server!" to send a message to all the players in the server to test out the server commands.

So there we have it. If you are running a t2.micro instance, you can run this server for [free](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=categories%23featured). However, if you so much as close the terminal where you are `ssh`ed in, your java process will terminate and your server will close. In the next few sections, I will discuss a few slightly more advanced things we can do with our server.

#### The Screen Command

Now that you have a fully functional Minecraft server running in the cloud, you'll probably want to be able to close your own terminal. Otherwise, what is the point of hosting this in the cloud if your computer has to be always running? There are many ways of achieving this, but we'll use the Unix [screen](https://kb.iu.edu/d/acuy) command. The screen command allows you to host multiple windows that can be detached and accessed again later. This means we can run our java server and forget about it. 

If your Minecraft server is still running, stop by entering `/stop`, the server command to stop the server. To create a new screen session with the name "minecraft", enter the following command:

`screen -S minecraft -md`

Now, to send commands to the session, we can either enter the window by using the resume command, or we can send them from this window. Let's be fancy and send them directly from this window. Enter the following two commands to change directories and then run the server in the screen session.

`screen -S minecraft -X stuff 'cd ~/MinecraftServer\n'`

`screen -S minecraft -X stuff 'sudo java -Xmx512M -Xms512M -jar server.jar\n'`

Now we can check out what's happening in the screen server by using the `-r` modifier. If all has gone well, we should see the normal server logs being generated. If everything looks good you can type `Ctrl+a` and then `d` to exit the current screen session. You can then close the ssh connection and the server will remain open.

`screen -r minecraft`

### Extras

