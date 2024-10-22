resource "aws_vpc" "main" {
  cidr_block = var.vpc_block

  tags = {
    Name = var.vpc_name
  }
}

resource "aws_subnet" "public_subnets" {
  vpc_id                  = aws_vpc.main.id
  count                   = length(var.public_subnet_block)
  cidr_block              = var.public_subnet_block[count.index]
  availability_zone       = var.availability_zone_block[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name = "${var.vpc_name}-public-${count.index + 1}"
  }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${var.vpc_name}-igw"
  }
}

resource "aws_route_table" "rt" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block = var.rt_cidr
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "${var.vpc_name}-public-rt"
  }
}

resource "aws_route_table_association" "rta" {
  count          = length(aws_subnet.public_subnets)
  subnet_id      = aws_subnet.public_subnets[count.index].id
  route_table_id = aws_route_table.rt.id
}