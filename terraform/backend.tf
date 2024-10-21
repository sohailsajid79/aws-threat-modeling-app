terraform {
  backend "s3" {
    bucket  = "tm-app-remote-tfstate"
    key     = "terraform.tfstate"
    region  = "eu-north-1"
    encrypt = true
  }
}