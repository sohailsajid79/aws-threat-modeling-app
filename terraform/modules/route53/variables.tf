variable "alb_dns_name" {
  description = "DNS name of the ALB"
  type        = string
}

variable "alb_zone_id" {
  description = "Hosted zone ID of the ALB"
  type        = string
}

variable "zone_name" {
  type        = string
  description = "Route53 zone name"
}

variable "cname_record_name" {
  type        = string
  description = "DNS subdomain record"
}