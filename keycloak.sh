#!/bin/bash

podman build -t app-keycloak:latest -f keycloak.dockerfile .
podman run -p 9900:8080 localhost/app-keycloak:latest