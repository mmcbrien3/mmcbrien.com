##How to host a Minecraft Server on AWS

Creating servers, writing code, saving money, and playing Minecraft are all fun, so let's do all of it in this tutorial. I'll cover how to use an AWS EC2 (Elastic Compute Cloud) server instance to host a Minecraft Server. I'll then go into how to use Lambda Functions and CloudWatch Events to schedule your EC2 instance to only run during peak crafting hours. You'll learn some basics of the AWS architecture and have your very own Minecraft Server whenver you want.

###Setting up AWS Account
First things first, you will need an AWS account. It's easy to setup over at [AWS](www.aws.com). You will need to enter a credit card for billing, but, depending on the resources you use in this tutorial, it will not cost you anything.

###Provisioning an EC2 Instance
EC2 (or Elastic Compute Cloud) is the bedrock of all AWS services. This will be where we set up our configure, launch, and manage our server. Click on Services > EC2 to open the EC2 console. On the left hand side should be an "Instances" tab. Click on that and then "Launch Instance" to bring up all the options.

####AMI
Your first choice is the AMI, or Amazon Machine Image. Here you can specify what you instance will have on startup including OS and software. I went with the basic "Amazon Linux 2 AMI (HVM), SSD Volume Type" (the one that is recommended), and it's been working well. If you have some strong inclination for another one go ahead, but don't choose a Windows AMI.

####Instance Type
The instance type specifies the specifications of the server including processing power (in terms of # of virtual CPUs), memory, and network performance. If you wish to do the free build, select the t2.micro instance with 1 vCPU and 1 [GiB](https://en.wikipedia.org/wiki/Gibibyte) of RAM. In my experience, this will struggle to host even a handful of Minecraft players, due to both the processing and memory constraints.

