FROM golang:1.21

WORKDIR /app
COPY . .

# Tắt CGO
ENV CGO_ENABLED=0

# (optional) fix luôn kiến trúc
ENV GOOS=linux
ENV GOARCH=amd64

RUN go build -o app main.go

EXPOSE 8080
CMD ["./app"]