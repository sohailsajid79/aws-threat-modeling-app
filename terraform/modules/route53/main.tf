resource "aws_route53_zone" "zone" {
  name = var.zone_name
}

resource "aws_acm_certificate" "tm_certificate" {
  domain_name       = var.cname_record_name
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "tm_validation" {
  for_each = {
    for dvo in aws_acm_certificate.tm_certificate.domain_validation_options : dvo.domain_name => {
      name  = dvo.resource_record_name
      type  = dvo.resource_record_type
      value = dvo.resource_record_value
    }
  }

  name    = each.value.name
  type    = each.value.type
  zone_id = aws_route53_zone.zone.zone_id
  records = [each.value.value]
  ttl     = 300
}

resource "aws_acm_certificate_validation" "tm_cert_validation" {
  certificate_arn         = aws_acm_certificate.tm_certificate.arn
  validation_record_fqdns = [for dvo in aws_acm_certificate.tm_certificate.domain_validation_options : aws_route53_record.tm_validation[dvo.domain_name].fqdn]
}

resource "aws_route53_record" "tm_record" {
  zone_id = aws_route53_zone.zone.zone_id
  name    = var.cname_record_name
  type    = "A"

  alias {
    name                   = var.alb_dns_name
    zone_id                = var.alb_zone_id
    evaluate_target_health = true
  }
}
