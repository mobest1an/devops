CREATE TABLE events (
                        id          BIGSERIAL PRIMARY KEY,
                        name        VARCHAR(255) NOT NULL,
                        game        VARCHAR(255) NOT NULL,
                        start_time  TIMESTAMP NOT NULL
);

CREATE TABLE tickets (
                         id            BIGSERIAL PRIMARY KEY,
                         event_id      BIGINT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
                         price         NUMERIC(10,2) NOT NULL,
                         quantity      INTEGER NOT NULL,
                         purchase_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
