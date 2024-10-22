variable "cluster_name" {
  type        = string
  description = "ECS cluster name"
}

variable "task_family" {
  type        = string
  description = "ECS task family name"
}

variable "task_cpu" {
  type        = number
  description = "Total cpu allocation"
}

variable "task_memory" {
  type        = number
  description = "Total memory allocation"
}

variable "execution_role_arn" {
  type        = string
  description = "ARN of the ECS task ARN"
}

variable "task_role_arn" {
  type        = string
  description = "ARN of the ECS Task Role"
}

variable "container_name" {
  type        = string
  description = "ECS container name"
}

variable "container_image" {
  type        = string
  description = "ECR repository URL"

}

variable "ports" {
  type        = number
  description = "Mapping container & host listener ports"
}

variable "service_name" {
  type        = string
  description = "ECS service name"
}

variable "to_add" {
  type        = number
  description = "Total tasks to run"
}

variable "subnet_ids" {
  type        = list(string)
  description = "Subnet IDs"
}

variable "security_group_ids" {
  type        = list(string)
  description = "Security group IDs"
}

variable "alb_target_group" {
  type        = string
  description = "ALB target group ARN"
}

variable "http_listener_arn" {
  type        = string
  description = "ARN of HTTP listener for ALB"
}

variable "https_listener_arn" {
  type        = string
  description = "ARN of HTTPS listener for ALB"
}