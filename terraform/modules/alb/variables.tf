variable "alb_name" {
  type        = string
  description = "ALB name"
}

variable "security_group_id" {
  type        = string
  description = "Attach security group ID to ALB"
}

variable "subnet_ids" {
  type        = list(string)
  description = "ALB subnets"
}

variable "target_group_name" {
  type        = string
  description = "Name of the target group"
}

variable "target_port" {
  type        = number
  description = "Target group port"
}

variable "vpc_id" {
  type        = string
  description = "VPC ID"
}

variable "certificate_arn" {
  type        = string
  description = "ARN SSL ACM certificate"
}
