locals {
  cidr     = ["0.0.0.0/0"]
  protocol = "tcp"
}

resource "aws_security_group" "ecs_sg" {
  name   = var.security_group
  vpc_id = var.vpc

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = local.protocol
    cidr_blocks = local.cidr
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = local.protocol
    cidr_blocks = local.cidr
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = local.protocol
    cidr_blocks = local.cidr
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = local.cidr
  }

  tags = {
    Name = var.security_group
  }
}