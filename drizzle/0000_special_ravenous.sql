CREATE TABLE "users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"nickName" varchar NOT NULL,
	"publicKey" varchar NOT NULL,
	"nonce" varchar NOT NULL,
	"nonceExpirationTime" bigint NOT NULL
);
