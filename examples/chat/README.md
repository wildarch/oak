# Chat Example

This directory holds a very simple chat application.

All client participants connect to the same Oak server application (one client
creates the application, the other clients connect to the created address:port).

A client can then create a **room**, which is protected by an authentication
bearer token that must be shared with any other participant to be invited to the
room.

Additionally, an **admin token** allows destruction of the room instance at the
server; the client keeps hold of this ID internally.

## Implementation

The application starts with a "router" node that only ever handles public data,
and is not allowed to inspect any data protected by a label (e.g. the
aforementioned authentication bearer token).

The router node receives gRPC invocations on an inbound chananel, but only looks
at the associated label (which is public), and based on the label only, routes
the request to either an existing or a newly created "room worker node", which
is created with that specific label and only ever handles data with the same
label, for the duration of its own lifetime.

## Command Line Operation

The first client to run typically creates the Oak Application and a first chat
room inside it:

```bash
./examples/chat/run
```

This will emit a trace line that holds the information needed to:

- connect to the same Oak application (with `--app_address`)
- join the chat room (with `--authorization_token`).

```log
2019-10-24 10:47:20  INFO  chat.cc : 242 : Join this room with --app_address=127.0.0.1:32889 --authorization_token=NKsceNlg69UbcvryfzmFGnMv9qnZ0DYh6u6gJxujnPPxvHsxMehoD368sumKawVaq9WaSkzrcStoNYLvVNdzhA==
```

Another party can then join the same chat room by using these arguments:

```bash
./examples/chat/run -C --app_address=127.0.0.1:32889 --authorization_token=NKsceNlg69UbcvryfzmFGnMv9qnZ0DYh6u6gJxujnPPxvHsxMehoD368sumKawVaq9WaSkzrcStoNYLvVNdzhA==
```

## CI Invocation

Note that the normal/default invocation of this example (with `./run` or
`scripts/run_example chat`) just starts an instance of the application then
immediately terminates it (this ensures that the CI runs work OK).
