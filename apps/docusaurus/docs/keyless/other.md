---
title: "Terminology and FAQ"
---

## Terminology

- **OpenID Connect (OIDC)**: is the identity authentication protocol used to enable federated identity verification. This protocol is what is used when a user goes through the "Sign in with Google" flow for example.
- **Identity Provider (IdP)**: is the trusted authority who authenticates your identity via OIDC. Supported example includes: Google.
- **JSON Web Token (JWT):** is an open standard used to share security information between two parties — a client and a server. Each JWT contains encoded JSON objects, including a set of claims. JWTs are signed using a cryptographic algorithm to ensure that the claims cannot be altered after the token is issued.
  - `iss`, an identifier for the OIDC provider (e.g., https://accounts.google.com)
  - `aud`, the OAuth `client_id` of the application that the user is signing in to (e.g., [Notion.so](https://notion.so))
  - `sub`, an identifier that the OIDC provider uses to identify the user
    - This could be an identifier specific to this `client_id`
    - Or, it could be an identifier shared across different `client_id`'s (e.g., Facebook’s OIDC does this)
  - `email`, some providers might also expose the user’s email as one of the fields (e.g., Google)
    - in addition, an `email_verified` field will be exposed to indicate if the provider has verified that the user owns this email address
  - `nonce`, arbitrary data that the application wants the OIDC provider to sign over
  - `iat`, the time the JWT was issued at.
- **Ephemeral Key Pair:** a temporary public/private key pair that is used to sign transactions for an Aptos Keyless account. The public key and its expiration date are committed in the JWT token via the `nonce` field.
- **Keyless Account:** a blockchain account that is directly-derived from (1) a user’s OIDC account (e.g., `alice@gmail.com`) and (2) an associated application’s OAuth client_id (e.g., Notion.so). Users authenticate through the OIDC flow.
- **JSON Web Key (JWK):** is the cryptographic public key of the OIDC provider. This public key is used to verify the signature on the JWTs that the OIDC provider issues to the client application. This way, the client application can verify the authenticity of the tokens and ensure that they have not been tampered with.
- **client_id:** the OAuth identifier for your application that you will receive from the IdP after registering your application with them. This will be used in our keyless architecture in the address derivation for your users.
- **redirect_uri:** the URI of the callback handler once the user successfully authenticates. Needs to be registered with your IdP.

## Ceremony

Aptos engaged in iterative trusted setup ceremonies to secure our Groth16 based ZK circuit. A trusted setup ceremony is a multi-party computation (MPC) that outputs the prover and verifier keys used in a zkSNARK system, common for efficient zero-knowledge proof systems. As long as a single participant in the ceremony is honest, the process is considered secure and the outputs will be valid. Our initial ceremony consisted of 140+ members of the Aptos ecosystem, which was an incredible show of the power of decentralization, security, and community - and a follow up ceremony was held following a developer feedback phase that allowed us to identify and implement an improvement to our circuit that helped us ensure Keyless is universally accessible. Our final ceremony contributions can be found in this repo [here] and verified using the process outlined [here].

## Frequently Asked Questions

What is the best way to use Keyless accounts?

The best way to use Keyless accounts depends on your use case. If seamless account interoperability across our ecosystem is important to your dApp experience (think: mint an NFT on your platform and allow users to sell their NFT on an external NFT marketplace), you might want to consider integrating a wallet that supports Keyless. If you want to create a fully embedded account experience in your dApp, allowing users to transact without ever leaving your application, you might want to do a direct integration of the Aptos Keyless SDK.

Does Keyless work with sponsored transactions or do my users always need to pay for their own gas?

Yes, Keyless works with sponsored transactions like any regular private key based account.

If I use the Aptos Keyless SDK, can my user’s use their accounts across other dApps?

Keyless accounts are scoped to the domain they are created with as the address derivation includes a unique identifier for the application.

What is Aptos Connect? Account Management Infrastructure: Central to the keyless accounts paradigm is a robust account management infrastructure that facilitates the creation, deletion, and management of user accounts, alongside the storage and retrieval of associated metadata.

While the adoption of keyless accounts heralds a paradigm shift towards enhanced usability and security, it is imperative for developers to remain cognizant of tradeoffs associated with this system vs. common alternatives like plaintext private keys.

Dependency on External Services: Keyless accounts introduce a degree of dependency on external authentication services, necessitating contingency plans and fallback mechanisms to mitigate service disruptions and ensure uninterrupted user access
