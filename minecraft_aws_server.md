
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

### Loggin' In

Now that we have our server set up, we need to log in to get the Minecraft server started. Before leaving the EC2 screen, make note of the Public IPv4 address of the instance.

Open up your favorite terminal of choice and head over to your directory with your .pem file. Once there you can run the following command:

`ssh -i minecraft_server_key.pem ec2-user@<your IPv4 address>`

If your system complains that the permissions are too open for your .pem file, you can run the chmod command to remedy that:

`chmod 600 minecraft_server_key.pem`

With that you should be greeted by the friendly EC2 bash logo. You are now operating within your remote EC2 instance.

### The Minecraft Server



