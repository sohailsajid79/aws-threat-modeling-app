variable "vpc_block" {
  type        = string
  description = "VPC CIDR"
}

variable "vpc_name" {
  type        = string
  description = "VPC name"

}

variable "public_subnet_block" {
  type        = list(string)
  description = "Public subnet CIDR block"
}

variable "availability_zone_block" {
  type        = list(string)
  description = "Availability zones"
}

variable "rt_cidr" {
  type        = string
  description = "CIDR route table "
}