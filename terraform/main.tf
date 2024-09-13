resource "aws_key_pair" "ec2_key" {
  key_name   = "ec2_login_key"
  public_key = file("../my-key.pub")
}

# security group for the server 
resource "aws_security_group" "security_group" {
  description = "Checking whether it will work or not"

  tags = {
    Name = var.sg_name
  }
  ingress = [
    for ports in [22, 80, 8080, 9000, 9090] : {
      from_port        = ports
      to_port          = ports
      protocol         = "tcp"
      cidr_blocks      = ["0.0.0.0/0"]
      self             = false
      ipv6_cidr_blocks = ["::/0"]
      prefix_list_ids  = []
      security_groups  = []
      description      = "All the allowed ports"
    }
  ]
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

#creating ec2 instance for jenkins server
resource "aws_instance" "server" {
  ami                    = var.ami_id
  key_name               = aws_key_pair.ec2_key.key_name
  instance_type          = "t2.medium"
  vpc_security_group_ids = [aws_security_group.security_group.id]
  root_block_device {
    volume_size = 10
  }
  tags = {
    Name = var.instance_name
  }

  user_data = templatefile("./install.sh", {})
}

output "PublicIp" {
  value = aws_instance.server.public_ip
}