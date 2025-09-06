FROM golang:1.24-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN CGO_ENABLED=0 go build -ldflags="-s -w" -o server main.go

FROM gcr.io/distroless/static:nonroot

WORKDIR /app

COPY --from=builder /app/server .

COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/

USER nonroot:nonroot

ENV DB_HOST=devops_p1-db DB_USER=postgres DB_PASS=postgres DB_NAME=devops_p1

EXPOSE 8080

CMD [ "./server" ]