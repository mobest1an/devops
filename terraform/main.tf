terraform {
  required_providers {
    yandex = {
      source = "yandex-cloud/yandex"
      version = "~> 0.93"
    }
  }
  required_version = ">= 0.13"
}

provider "yandex" {
  zone = "ru-central1-b"
}

resource "yandex_compute_disk" "boot-disk-1" {
  name     = "boot-disk-1"
  type     = "network-ssd"
  zone     = "ru-central1-b"
  size     = "20"
  image_id = "fd888dplf7gt1nguheht"
}

resource "yandex_compute_instance" "vm-1-1" {
  name = "terraform-vm-1"

  platform_id = "standard-v2"

  resources {
    cores  = 2
    core_fraction = 50
    memory = 4
  }

  boot_disk {
    disk_id = yandex_compute_disk.boot-disk-1.id
  }

  network_interface {
    subnet_id = yandex_vpc_subnet.subnet-1.id
    nat       = true
  }

  metadata = {
    ssh-keys = "ubuntu:${file("~/.ssh/id_ed25519.pub")}"
  }
}

resource "yandex_vpc_network" "network-1" {
  name = "network1"
}

resource "yandex_vpc_subnet" "subnet-1" {
  name           = "subnet1"
  zone           = "ru-central1-b"
  network_id     = yandex_vpc_network.network-1.id
  v4_cidr_blocks = ["10.120.0.0/24"]
}
