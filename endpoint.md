# Search Address Details

> Returns a list of addresses that match the specified search term.



## OpenAPI

````yaml api-reference/data-api.json get /v2/addresses
openapi: 3.0.0
info:
  title: Range Data API
  description: >-
    The Range Data API for crypto addresses, networks, transactions, and
    entities.
  version: '1.0'
  contact: {}
servers:
  - url: https://api.range.org
    description: Range API Server
security:
  - Authorization: []
tags:
  - name: Address Information
    description: Get information about a crypto address.
  - name: Entity Information
    description: Get information about entities.
  - name: Network Information
    description: Get information about networks.
  - name: Protocols
    description: Get information about cross-chain protocols.
  - name: Token transfers
    description: Get information about token transfers.
paths:
  /v2/addresses:
    get:
      tags:
        - Address Information
      summary: Search Address Details
      description: Returns a list of addresses that match the specified search term.
      operationId: searchAddressLabels
      parameters:
        - name: networks
          required: false
          in: query
          description: >-
            Comma-separated list of blockchain networks to filter by (e.g.,
            ethereum, solana). Repeats also allowed.
          schema:
            example:
              - ethereum
              - solana
            type: array
            items:
              type: string
        - name: status
          required: false
          in: query
          description: Comma-separated list of address statuses. Repeats also allowed.
          schema:
            example:
              - malicious
              - sanctioned
            type: array
            items:
              type: string
              enum:
                - malicious
                - blacklisted
                - sanctioned
      responses:
        '200':
          description: List of addresses that match the specified search term.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AddressIndexResponseDto'
components:
  schemas:
    AddressIndexResponseDto:
      type: object
      properties:
        items:
          type: array
          items:
            $ref: '#/components/schemas/AddressDto'
        meta:
          $ref: '#/components/schemas/CursorMetaDto'
      required:
        - items
        - meta
    AddressDto:
      type: object
      properties:
        id:
          type: string
          example: solana:9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin
          description: Record id
        address:
          type: string
          example: 9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin
          description: Address
        network:
          type: string
          example: solana
          description: Blockchain network identifier (e.g. solana, stellar)
        type:
          type: string
          enum:
            - account
            - validator
            - contract
            - module
            - multisig
          example: multisig
        status:
          type: array
          example:
            - blacklisted
          items:
            type: string
            enum:
              - malicious
              - blacklisted
              - sanctioned
        label:
          type: string
          example: Treasury Multisig
        entity:
          type: string
          example: DAO Alpha
        blocked_by:
          example:
            - id: dao-alpha
              name: DAO Alpha
              icon_url: https://cdn.example.com/icons/dao-alpha.png
          type: array
          items:
            $ref: '#/components/schemas/EntityDto'
        tags:
          example:
            - DAO
            - Squads v3 Multisig
          items:
            type: array
          type: array
        balances:
          example:
            - denom: SOL
              amount: '5000000000'
          type: array
          items:
            $ref: '#/components/schemas/BalanceDto'
        last_active_at:
          type: string
          example: '2025-08-20T12:34:56.000Z'
      required:
        - id
        - address
        - network
        - type
        - status
        - label
        - entity
        - blocked_by
        - tags
        - balances
        - last_active_at
    CursorMetaDto:
      type: object
      properties:
        next_cursor:
          type: string
          nullable: true
          description: >-
            Opaque string cursor pointing to the next page of results. null if
            there is no next page.
          example: eyJpZCI6IjkxeFFlV3Z...
        previous_cursor:
          type: string
          nullable: true
          description: >-
            Opaque string cursor pointing to the previous page of results. null
            if there is no previous page.
          example: eyJpZCI6IjkxeFFlV3Z...
        first_page_cursor:
          type: string
          description: >-
            Opaque string cursor pointing to the very first page in the entire
            dataset with respect to the current filter.
          example: eyJpZCI6IjkxeFFlV3Z...
        last_page_cursor:
          type: string
          nullable: true
          description: >-
            Opaque string cursor pointing to the very last page in the entire
            dataset with respect to the current filter.
          example: eyJpZCI6IjkxeFFlV3Z...
        total_count:
          type: number
          nullable: true
          description: Total number of results.
          example: 100
        page_number:
          type: number
          description: Current page number.
          example: 1
    EntityDto:
      type: object
      properties:
        id:
          type: string
          example: dao-alpha
        name:
          type: string
          example: DAO Alpha
        icon_url:
          type: string
          example: https://cdn.example.com/icons/dao-alpha.png
      required:
        - id
        - name
    BalanceDto:
      type: object
      properties:
        amount:
          type: string
          example: '5000000000'
        denom:
          type: string
          example: SOL
      required:
        - amount
        - denom
  securitySchemes:
    Authorization:
      type: http
      scheme: bearer
      bearerFormat: API Key
      description: 'Use Authorization: Bearer <api-key>'

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.range.org/llms.txt

# Search Address Details

> Returns a list of addresses that match the specified search term.



## OpenAPI

````yaml api-reference/data-api.json get /v2/addresses
openapi: 3.0.0
info:
  title: Range Data API
  description: >-
    The Range Data API for crypto addresses, networks, transactions, and
    entities.
  version: '1.0'
  contact: {}
servers:
  - url: https://api.range.org
    description: Range API Server
security:
  - Authorization: []
tags:
  - name: Address Information
    description: Get information about a crypto address.
  - name: Entity Information
    description: Get information about entities.
  - name: Network Information
    description: Get information about networks.
  - name: Protocols
    description: Get information about cross-chain protocols.
  - name: Token transfers
    description: Get information about token transfers.
paths:
  /v2/addresses:
    get:
      tags:
        - Address Information
      summary: Search Address Details
      description: Returns a list of addresses that match the specified search term.
      operationId: searchAddressLabels
      parameters:
        - name: networks
          required: false
          in: query
          description: >-
            Comma-separated list of blockchain networks to filter by (e.g.,
            ethereum, solana). Repeats also allowed.
          schema:
            example:
              - ethereum
              - solana
            type: array
            items:
              type: string
        - name: status
          required: false
          in: query
          description: Comma-separated list of address statuses. Repeats also allowed.
          schema:
            example:
              - malicious
              - sanctioned
            type: array
            items:
              type: string
              enum:
                - malicious
                - blacklisted
                - sanctioned
      responses:
        '200':
          description: List of addresses that match the specified search term.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AddressIndexResponseDto'
components:
  schemas:
    AddressIndexResponseDto:
      type: object
      properties:
        items:
          type: array
          items:
            $ref: '#/components/schemas/AddressDto'
        meta:
          $ref: '#/components/schemas/CursorMetaDto'
      required:
        - items
        - meta
    AddressDto:
      type: object
      properties:
        id:
          type: string
          example: solana:9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin
          description: Record id
        address:
          type: string
          example: 9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin
          description: Address
        network:
          type: string
          example: solana
          description: Blockchain network identifier (e.g. solana, stellar)
        type:
          type: string
          enum:
            - account
            - validator
            - contract
            - module
            - multisig
          example: multisig
        status:
          type: array
          example:
            - blacklisted
          items:
            type: string
            enum:
              - malicious
              - blacklisted
              - sanctioned
        label:
          type: string
          example: Treasury Multisig
        entity:
          type: string
          example: DAO Alpha
        blocked_by:
          example:
            - id: dao-alpha
              name: DAO Alpha
              icon_url: https://cdn.example.com/icons/dao-alpha.png
          type: array
          items:
            $ref: '#/components/schemas/EntityDto'
        tags:
          example:
            - DAO
            - Squads v3 Multisig
          items:
            type: array
          type: array
        balances:
          example:
            - denom: SOL
              amount: '5000000000'
          type: array
          items:
            $ref: '#/components/schemas/BalanceDto'
        last_active_at:
          type: string
          example: '2025-08-20T12:34:56.000Z'
      required:
        - id
        - address
        - network
        - type
        - status
        - label
        - entity
        - blocked_by
        - tags
        - balances
        - last_active_at
    CursorMetaDto:
      type: object
      properties:
        next_cursor:
          type: string
          nullable: true
          description: >-
            Opaque string cursor pointing to the next page of results. null if
            there is no next page.
          example: eyJpZCI6IjkxeFFlV3Z...
        previous_cursor:
          type: string
          nullable: true
          description: >-
            Opaque string cursor pointing to the previous page of results. null
            if there is no previous page.
          example: eyJpZCI6IjkxeFFlV3Z...
        first_page_cursor:
          type: string
          description: >-
            Opaque string cursor pointing to the very first page in the entire
            dataset with respect to the current filter.
          example: eyJpZCI6IjkxeFFlV3Z...
        last_page_cursor:
          type: string
          nullable: true
          description: >-
            Opaque string cursor pointing to the very last page in the entire
            dataset with respect to the current filter.
          example: eyJpZCI6IjkxeFFlV3Z...
        total_count:
          type: number
          nullable: true
          description: Total number of results.
          example: 100
        page_number:
          type: number
          description: Current page number.
          example: 1
    EntityDto:
      type: object
      properties:
        id:
          type: string
          example: dao-alpha
        name:
          type: string
          example: DAO Alpha
        icon_url:
          type: string
          example: https://cdn.example.com/icons/dao-alpha.png
      required:
        - id
        - name
    BalanceDto:
      type: object
      properties:
        amount:
          type: string
          example: '5000000000'
        denom:
          type: string
          example: SOL
      required:
        - amount
        - denom
  securitySchemes:
    Authorization:
      type: http
      scheme: bearer
      bearerFormat: API Key
      description: 'Use Authorization: Bearer <api-key>'

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.range.org/llms.txt

# Search Address Labels

> Returns a list of addresses that match the specified search term.



## OpenAPI

````yaml api-reference/data-api.json get /v1/address/labels/search
openapi: 3.0.0
info:
  title: Range Data API
  description: >-
    The Range Data API for crypto addresses, networks, transactions, and
    entities.
  version: '1.0'
  contact: {}
servers:
  - url: https://api.range.org
    description: Range API Server
security:
  - Authorization: []
tags:
  - name: Address Information
    description: Get information about a crypto address.
  - name: Entity Information
    description: Get information about entities.
  - name: Network Information
    description: Get information about networks.
  - name: Protocols
    description: Get information about cross-chain protocols.
  - name: Token transfers
    description: Get information about token transfers.
paths:
  /v1/address/labels/search:
    get:
      tags:
        - Address Information
      summary: Search Address Labels
      description: Returns a list of addresses that match the specified search term.
      operationId: searchAddressLabels
      parameters:
        - name: networks
          required: false
          in: query
          description: >-
            Comma-separated list of blockchain networks to filter addresses by
            (e.g., ethereum, solana)
          schema:
            type: array
            items:
              type: string
        - name: addresses
          required: false
          in: query
          description: >-
            Comma-separated list of blockchain addresses to filter (e.g., 0x123,
            0x456)
          schema:
            type: array
            items:
              type: string
        - name: searchString
          required: false
          in: query
          description: Substring to search for in addresses or labels (case insensitive)
          schema:
            type: string
        - name: includeNft
          required: false
          in: query
          description: Include NFT addresses in the search results
          schema:
            default: false
            type: boolean
        - name: validateSearch
          required: true
          in: query
          schema:
            type: boolean
      responses:
        '200':
          description: List of addresses that match the specified search term.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/AddressDetails'
components:
  schemas:
    AddressDetails:
      type: object
      properties:
        address:
          type: string
        network:
          type: string
        ecosystem:
          type: string
        name_tag:
          type: string
        category:
          type: string
        address_role:
          type: string
        entity:
          type: string
        attributes:
          type: object
        tags:
          type: array
          items:
            type: string
        malicious:
          type: boolean
        is_validator:
          type: boolean
      required:
        - address
        - network
        - ecosystem
        - malicious
        - is_validator
  securitySchemes:
    Authorization:
      type: http
      scheme: bearer
      bearerFormat: API Key
      description: 'Use Authorization: Bearer <api-key>'

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.range.org/llms.txt

# Search Address Labels

> Returns a list of addresses that match the specified search term.



## OpenAPI

````yaml api-reference/data-api.json get /v1/address/labels/search
openapi: 3.0.0
info:
  title: Range Data API
  description: >-
    The Range Data API for crypto addresses, networks, transactions, and
    entities.
  version: '1.0'
  contact: {}
servers:
  - url: https://api.range.org
    description: Range API Server
security:
  - Authorization: []
tags:
  - name: Address Information
    description: Get information about a crypto address.
  - name: Entity Information
    description: Get information about entities.
  - name: Network Information
    description: Get information about networks.
  - name: Protocols
    description: Get information about cross-chain protocols.
  - name: Token transfers
    description: Get information about token transfers.
paths:
  /v1/address/labels/search:
    get:
      tags:
        - Address Information
      summary: Search Address Labels
      description: Returns a list of addresses that match the specified search term.
      operationId: searchAddressLabels
      parameters:
        - name: networks
          required: false
          in: query
          description: >-
            Comma-separated list of blockchain networks to filter addresses by
            (e.g., ethereum, solana)
          schema:
            type: array
            items:
              type: string
        - name: addresses
          required: false
          in: query
          description: >-
            Comma-separated list of blockchain addresses to filter (e.g., 0x123,
            0x456)
          schema:
            type: array
            items:
              type: string
        - name: searchString
          required: false
          in: query
          description: Substring to search for in addresses or labels (case insensitive)
          schema:
            type: string
        - name: includeNft
          required: false
          in: query
          description: Include NFT addresses in the search results
          schema:
            default: false
            type: boolean
        - name: validateSearch
          required: true
          in: query
          schema:
            type: boolean
      responses:
        '200':
          description: List of addresses that match the specified search term.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/AddressDetails'
components:
  schemas:
    AddressDetails:
      type: object
      properties:
        address:
          type: string
        network:
          type: string
        ecosystem:
          type: string
        name_tag:
          type: string
        category:
          type: string
        address_role:
          type: string
        entity:
          type: string
        attributes:
          type: object
        tags:
          type: array
          items:
            type: string
        malicious:
          type: boolean
        is_validator:
          type: boolean
      required:
        - address
        - network
        - ecosystem
        - malicious
        - is_validator
  securitySchemes:
    Authorization:
      type: http
      scheme: bearer
      bearerFormat: API Key
      description: 'Use Authorization: Bearer <api-key>'

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.range.org/llms.txt

# Get Address Statistics

> Returns date of last and first interaction of this address with the network.



## OpenAPI

````yaml api-reference/data-api.json get /v1/address/stats
openapi: 3.0.0
info:
  title: Range Data API
  description: >-
    The Range Data API for crypto addresses, networks, transactions, and
    entities.
  version: '1.0'
  contact: {}
servers:
  - url: https://api.range.org
    description: Range API Server
security:
  - Authorization: []
tags:
  - name: Address Information
    description: Get information about a crypto address.
  - name: Entity Information
    description: Get information about entities.
  - name: Network Information
    description: Get information about networks.
  - name: Protocols
    description: Get information about cross-chain protocols.
  - name: Token transfers
    description: Get information about token transfers.
paths:
  /v1/address/stats:
    get:
      tags:
        - Address Information
      summary: Get Address Statistics
      description: >-
        Returns date of last and first interaction of this address with the
        network.
      operationId: getAddressStats
      parameters:
        - name: network
          required: true
          in: query
          description: Network of Address
          schema:
            type: string
        - name: address
          required: true
          in: query
          description: Address to search
          schema:
            type: string
      responses:
        '200':
          description: Address interaction dates.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AddressStats'
components:
  schemas:
    AddressStats:
      type: object
      properties:
        address:
          type: string
        network:
          type: string
        earliest_tx:
          type: string
        latest_tx:
          type: string
      required:
        - address
        - network
        - earliest_tx
        - latest_tx
  securitySchemes:
    Authorization:
      type: http
      scheme: bearer
      bearerFormat: API Key
      description: 'Use Authorization: Bearer <api-key>'

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.range.org/llms.txt

# Get Address Statistics

> Returns date of last and first interaction of this address with the network.



## OpenAPI

````yaml api-reference/data-api.json get /v1/address/stats
openapi: 3.0.0
info:
  title: Range Data API
  description: >-
    The Range Data API for crypto addresses, networks, transactions, and
    entities.
  version: '1.0'
  contact: {}
servers:
  - url: https://api.range.org
    description: Range API Server
security:
  - Authorization: []
tags:
  - name: Address Information
    description: Get information about a crypto address.
  - name: Entity Information
    description: Get information about entities.
  - name: Network Information
    description: Get information about networks.
  - name: Protocols
    description: Get information about cross-chain protocols.
  - name: Token transfers
    description: Get information about token transfers.
paths:
  /v1/address/stats:
    get:
      tags:
        - Address Information
      summary: Get Address Statistics
      description: >-
        Returns date of last and first interaction of this address with the
        network.
      operationId: getAddressStats
      parameters:
        - name: network
          required: true
          in: query
          description: Network of Address
          schema:
            type: string
        - name: address
          required: true
          in: query
          description: Address to search
          schema:
            type: string
      responses:
        '200':
          description: Address interaction dates.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AddressStats'
components:
  schemas:
    AddressStats:
      type: object
      properties:
        address:
          type: string
        network:
          type: string
        earliest_tx:
          type: string
        latest_tx:
          type: string
      required:
        - address
        - network
        - earliest_tx
        - latest_tx
  securitySchemes:
    Authorization:
      type: http
      scheme: bearer
      bearerFormat: API Key
      description: 'Use Authorization: Bearer <api-key>'

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.range.org/llms.txt

# Get Address Statistics

> Returns date of last and first interaction of this address with the network.



## OpenAPI

````yaml api-reference/data-api.json get /v1/address/stats
openapi: 3.0.0
info:
  title: Range Data API
  description: >-
    The Range Data API for crypto addresses, networks, transactions, and
    entities.
  version: '1.0'
  contact: {}
servers:
  - url: https://api.range.org
    description: Range API Server
security:
  - Authorization: []
tags:
  - name: Address Information
    description: Get information about a crypto address.
  - name: Entity Information
    description: Get information about entities.
  - name: Network Information
    description: Get information about networks.
  - name: Protocols
    description: Get information about cross-chain protocols.
  - name: Token transfers
    description: Get information about token transfers.
paths:
  /v1/address/stats:
    get:
      tags:
        - Address Information
      summary: Get Address Statistics
      description: >-
        Returns date of last and first interaction of this address with the
        network.
      operationId: getAddressStats
      parameters:
        - name: network
          required: true
          in: query
          description: Network of Address
          schema:
            type: string
        - name: address
          required: true
          in: query
          description: Address to search
          schema:
            type: string
      responses:
        '200':
          description: Address interaction dates.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AddressStats'
components:
  schemas:
    AddressStats:
      type: object
      properties:
        address:
          type: string
        network:
          type: string
        earliest_tx:
          type: string
        latest_tx:
          type: string
      required:
        - address
        - network
        - earliest_tx
        - latest_tx
  securitySchemes:
    Authorization:
      type: http
      scheme: bearer
      bearerFormat: API Key
      description: 'Use Authorization: Bearer <api-key>'

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.range.org/llms.txt

# Get Transaction Details

> Returns details of a transactions associated with the specified hash.



## OpenAPI

````yaml api-reference/data-api.json get /v1/address/transaction
openapi: 3.0.0
info:
  title: Range Data API
  description: >-
    The Range Data API for crypto addresses, networks, transactions, and
    entities.
  version: '1.0'
  contact: {}
servers:
  - url: https://api.range.org
    description: Range API Server
security:
  - Authorization: []
tags:
  - name: Address Information
    description: Get information about a crypto address.
  - name: Entity Information
    description: Get information about entities.
  - name: Network Information
    description: Get information about networks.
  - name: Protocols
    description: Get information about cross-chain protocols.
  - name: Token transfers
    description: Get information about token transfers.
paths:
  /v1/address/transaction:
    get:
      tags:
        - Address Information
      summary: Get Transaction Details
      description: Returns details of a transactions associated with the specified hash.
      operationId: getTransaction
      parameters:
        - name: hash
          required: true
          in: query
          description: hash to search
          schema:
            type: string
      responses:
        '200':
          description: Transaction associated with a specific hash.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Transaction'
components:
  schemas:
    Transaction:
      type: object
      properties:
        id:
          type: string
        version:
          type: number
        network:
          type: string
        height:
          type: string
        index:
          type: number
        timestamp:
          type: string
        hash:
          type: string
        sender:
          type: string
        message_types:
          type: array
          items:
            type: string
        addresses:
          type: array
          items:
            type: string
        success:
          type: boolean
        gas:
          type: object
          properties:
            wanted:
              type: number
            used:
              type: number
          required:
            - wanted
            - used
        fees:
          type: object
          properties:
            amount:
              type: string
            denom:
              type: string
          required:
            - amount
            - denom
        amounts:
          type: array
          items:
            type: string
        memo:
          type: string
        signers:
          type: array
          items:
            type: string
        messages:
          type: array
          items:
            type: string
      required:
        - id
        - version
        - network
        - height
        - index
        - timestamp
        - hash
        - sender
        - message_types
        - addresses
        - success
        - gas
        - fees
        - amounts
        - memo
        - signers
        - messages
  securitySchemes:
    Authorization:
      type: http
      scheme: bearer
      bearerFormat: API Key
      description: 'Use Authorization: Bearer <api-key>'

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.range.org/llms.txt

# Get Address Payments

> Returns a list of transactions associated with the specified address.



## OpenAPI

````yaml api-reference/data-api.json get /v1/address/payments
openapi: 3.0.0
info:
  title: Range Data API
  description: >-
    The Range Data API for crypto addresses, networks, transactions, and
    entities.
  version: '1.0'
  contact: {}
servers:
  - url: https://api.range.org
    description: Range API Server
security:
  - Authorization: []
tags:
  - name: Address Information
    description: Get information about a crypto address.
  - name: Entity Information
    description: Get information about entities.
  - name: Network Information
    description: Get information about networks.
  - name: Protocols
    description: Get information about cross-chain protocols.
  - name: Token transfers
    description: Get information about token transfers.
paths:
  /v1/address/payments:
    get:
      tags:
        - Address Information
      summary: Get Address Payments
      description: Returns a list of transactions associated with the specified address.
      operationId: getAddressPayments
      parameters:
        - name: address
          required: true
          in: query
          description: Address to search
          schema:
            type: string
        - name: network
          required: false
          in: query
          description: Network of Address
          schema:
            default: address
            type: string
        - name: groupBy
          required: false
          in: query
          description: '"address" mode or "entity" mode'
          schema:
            default: address
            type: string
        - name: receiver
          required: false
          in: query
          description: Another address involved in the transaction
          schema:
            type: string
        - name: receiverNetwork
          required: false
          in: query
          description: Network of Another address involved in the transaction
          schema:
            type: string
        - name: startTime
          required: false
          in: query
          description: Start time
          schema:
            type: string
        - name: endTime
          required: false
          in: query
          description: End time
          schema:
            type: string
        - name: msgType
          required: false
          in: query
          description: msg types separated by comma
          schema:
            type: string
        - name: limit
          required: false
          in: query
          description: Number of items to return
          schema:
            default: 50
            type: number
        - name: offset
          required: false
          in: query
          description: Number of items to skip
          schema:
            default: 0
            type: number
        - name: direction
          required: false
          in: query
          description: direction of payment (incoming, outgoing, both)
          schema:
            default: both
            type: string
        - name: sort
          required: false
          in: query
          description: sort order (asc, desc)
          schema:
            default: desc
            type: string
      responses:
        '200':
          description: >-
            Payments associated with a specific address. This includes both
            incoming and outgoing transactions.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaymentsInfo'
components:
  schemas:
    PaymentsInfo:
      type: object
      properties:
        total:
          type: number
        payments:
          type: array
          items:
            $ref: '#/components/schemas/Payment'
      required:
        - total
        - payments
    Payment:
      type: object
      properties:
        id:
          type: string
        time:
          type: string
        denom:
          type: string
        amount:
          type: string
        sender_tx_hash:
          type: string
        sender_entity:
          type: string
        sender_height:
          type: string
        sender_network:
          type: string
        sender_address_id:
          type: string
        sender_address_details:
          $ref: '#/components/schemas/AddressDetails'
        receiver_address_details:
          $ref: '#/components/schemas/AddressDetails'
      required:
        - id
        - time
        - denom
        - amount
        - sender_tx_hash
        - sender_entity
        - sender_height
        - sender_network
        - sender_address_id
    AddressDetails:
      type: object
      properties:
        address:
          type: string
        network:
          type: string
        ecosystem:
          type: string
        name_tag:
          type: string
        category:
          type: string
        address_role:
          type: string
        entity:
          type: string
        attributes:
          type: object
        tags:
          type: array
          items:
            type: string
        malicious:
          type: boolean
        is_validator:
          type: boolean
      required:
        - address
        - network
        - ecosystem
        - malicious
        - is_validator
  securitySchemes:
    Authorization:
      type: http
      scheme: bearer
      bearerFormat: API Key
      description: 'Use Authorization: Bearer <api-key>'

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.range.org/llms.txt

# Get Address Payments

> Returns a list of transactions associated with the specified address.



## OpenAPI

````yaml api-reference/data-api.json get /v1/address/payments
openapi: 3.0.0
info:
  title: Range Data API
  description: >-
    The Range Data API for crypto addresses, networks, transactions, and
    entities.
  version: '1.0'
  contact: {}
servers:
  - url: https://api.range.org
    description: Range API Server
security:
  - Authorization: []
tags:
  - name: Address Information
    description: Get information about a crypto address.
  - name: Entity Information
    description: Get information about entities.
  - name: Network Information
    description: Get information about networks.
  - name: Protocols
    description: Get information about cross-chain protocols.
  - name: Token transfers
    description: Get information about token transfers.
paths:
  /v1/address/payments:
    get:
      tags:
        - Address Information
      summary: Get Address Payments
      description: Returns a list of transactions associated with the specified address.
      operationId: getAddressPayments
      parameters:
        - name: address
          required: true
          in: query
          description: Address to search
          schema:
            type: string
        - name: network
          required: false
          in: query
          description: Network of Address
          schema:
            default: address
            type: string
        - name: groupBy
          required: false
          in: query
          description: '"address" mode or "entity" mode'
          schema:
            default: address
            type: string
        - name: receiver
          required: false
          in: query
          description: Another address involved in the transaction
          schema:
            type: string
        - name: receiverNetwork
          required: false
          in: query
          description: Network of Another address involved in the transaction
          schema:
            type: string
        - name: startTime
          required: false
          in: query
          description: Start time
          schema:
            type: string
        - name: endTime
          required: false
          in: query
          description: End time
          schema:
            type: string
        - name: msgType
          required: false
          in: query
          description: msg types separated by comma
          schema:
            type: string
        - name: limit
          required: false
          in: query
          description: Number of items to return
          schema:
            default: 50
            type: number
        - name: offset
          required: false
          in: query
          description: Number of items to skip
          schema:
            default: 0
            type: number
        - name: direction
          required: false
          in: query
          description: direction of payment (incoming, outgoing, both)
          schema:
            default: both
            type: string
        - name: sort
          required: false
          in: query
          description: sort order (asc, desc)
          schema:
            default: desc
            type: string
      responses:
        '200':
          description: >-
            Payments associated with a specific address. This includes both
            incoming and outgoing transactions.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaymentsInfo'
components:
  schemas:
    PaymentsInfo:
      type: object
      properties:
        total:
          type: number
        payments:
          type: array
          items:
            $ref: '#/components/schemas/Payment'
      required:
        - total
        - payments
    Payment:
      type: object
      properties:
        id:
          type: string
        time:
          type: string
        denom:
          type: string
        amount:
          type: string
        sender_tx_hash:
          type: string
        sender_entity:
          type: string
        sender_height:
          type: string
        sender_network:
          type: string
        sender_address_id:
          type: string
        sender_address_details:
          $ref: '#/components/schemas/AddressDetails'
        receiver_address_details:
          $ref: '#/components/schemas/AddressDetails'
      required:
        - id
        - time
        - denom
        - amount
        - sender_tx_hash
        - sender_entity
        - sender_height
        - sender_network
        - sender_address_id
    AddressDetails:
      type: object
      properties:
        address:
          type: string
        network:
          type: string
        ecosystem:
          type: string
        name_tag:
          type: string
        category:
          type: string
        address_role:
          type: string
        entity:
          type: string
        attributes:
          type: object
        tags:
          type: array
          items:
            type: string
        malicious:
          type: boolean
        is_validator:
          type: boolean
      required:
        - address
        - network
        - ecosystem
        - malicious
        - is_validator
  securitySchemes:
    Authorization:
      type: http
      scheme: bearer
      bearerFormat: API Key
      description: 'Use Authorization: Bearer <api-key>'

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.range.org/llms.txt

# Get Transaction Counts for the specified addresses

> Returns a list of transaction counts aggregated by day.



## OpenAPI

````yaml api-reference/data-api.json get /v1/address/transactions/counts
openapi: 3.0.0
info:
  title: Range Data API
  description: >-
    The Range Data API for crypto addresses, networks, transactions, and
    entities.
  version: '1.0'
  contact: {}
servers:
  - url: https://api.range.org
    description: Range API Server
security:
  - Authorization: []
tags:
  - name: Address Information
    description: Get information about a crypto address.
  - name: Entity Information
    description: Get information about entities.
  - name: Network Information
    description: Get information about networks.
  - name: Protocols
    description: Get information about cross-chain protocols.
  - name: Token transfers
    description: Get information about token transfers.
paths:
  /v1/address/transactions/counts:
    get:
      tags:
        - Address Information
      summary: Get Transaction Counts for the specified addresses
      description: Returns a list of transaction counts aggregated by day.
      operationId: getTxCounts
      parameters:
        - name: addresses
          required: true
          in: query
          description: Comma separated list of addresses to include
          schema:
            type: string
      responses:
        '200':
          description: Aggregated transaction counts for the specified addresses.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AddressTxCount'
components:
  schemas:
    AddressTxCount:
      type: object
      properties: {}
  securitySchemes:
    Authorization:
      type: http
      scheme: bearer
      bearerFormat: API Key
      description: 'Use Authorization: Bearer <api-key>'

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.range.org/llms.txt

# Get Transaction Counts for the specified addresses

> Returns a list of transaction counts aggregated by day.



## OpenAPI

````yaml api-reference/data-api.json get /v1/address/transactions/counts
openapi: 3.0.0
info:
  title: Range Data API
  description: >-
    The Range Data API for crypto addresses, networks, transactions, and
    entities.
  version: '1.0'
  contact: {}
servers:
  - url: https://api.range.org
    description: Range API Server
security:
  - Authorization: []
tags:
  - name: Address Information
    description: Get information about a crypto address.
  - name: Entity Information
    description: Get information about entities.
  - name: Network Information
    description: Get information about networks.
  - name: Protocols
    description: Get information about cross-chain protocols.
  - name: Token transfers
    description: Get information about token transfers.
paths:
  /v1/address/transactions/counts:
    get:
      tags:
        - Address Information
      summary: Get Transaction Counts for the specified addresses
      description: Returns a list of transaction counts aggregated by day.
      operationId: getTxCounts
      parameters:
        - name: addresses
          required: true
          in: query
          description: Comma separated list of addresses to include
          schema:
            type: string
      responses:
        '200':
          description: Aggregated transaction counts for the specified addresses.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AddressTxCount'
components:
  schemas:
    AddressTxCount:
      type: object
      properties: {}
  securitySchemes:
    Authorization:
      type: http
      scheme: bearer
      bearerFormat: API Key
      description: 'Use Authorization: Bearer <api-key>'

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.range.org/llms.txt

# Get Current Token Balances of an Address

> Returns a list of token balances of given address.



## OpenAPI

````yaml api-reference/data-api.json get /v1/address/balance
openapi: 3.0.0
info:
  title: Range Data API
  description: >-
    The Range Data API for crypto addresses, networks, transactions, and
    entities.
  version: '1.0'
  contact: {}
servers:
  - url: https://api.range.org
    description: Range API Server
security:
  - Authorization: []
tags:
  - name: Address Information
    description: Get information about a crypto address.
  - name: Entity Information
    description: Get information about entities.
  - name: Network Information
    description: Get information about networks.
  - name: Protocols
    description: Get information about cross-chain protocols.
  - name: Token transfers
    description: Get information about token transfers.
paths:
  /v1/address/balance:
    get:
      tags:
        - Address Information
      summary: Get Current Token Balances of an Address
      description: Returns a list of token balances of given address.
      operationId: getBalance
      parameters:
        - name: network
          required: true
          in: query
          description: Network of Address
          schema:
            type: string
        - name: address
          required: true
          in: query
          description: Address to search
          schema:
            type: string
      responses:
        '200':
          description: >-
            Payments associated with a specific address. This includes both
            incoming and outgoing transactions.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BalancesInfo'
components:
  schemas:
    BalancesInfo:
      type: object
      properties:
        total:
          type: number
        balances:
          type: array
          items:
            $ref: '#/components/schemas/Balance'
      required:
        - total
        - balances
    Balance:
      type: object
      properties:
        denom:
          type: string
        net_balance_change:
          type: number
        date:
          type: string
        total_received:
          type: number
        total_sent:
          type: number
      required:
        - denom
        - net_balance_change
        - date
        - total_received
        - total_sent
  securitySchemes:
    Authorization:
      type: http
      scheme: bearer
      bearerFormat: API Key
      description: 'Use Authorization: Bearer <api-key>'

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.range.org/llms.txt

# Get all cross-chain transactions

> Returns a list of cross-chain transactions with filters



## OpenAPI

````yaml api-reference/data-api.json post /v1/protocols/transactions
openapi: 3.0.0
info:
  title: Range Data API
  description: >-
    The Range Data API for crypto addresses, networks, transactions, and
    entities.
  version: '1.0'
  contact: {}
servers:
  - url: https://api.range.org
    description: Range API Server
security:
  - Authorization: []
tags:
  - name: Address Information
    description: Get information about a crypto address.
  - name: Entity Information
    description: Get information about entities.
  - name: Network Information
    description: Get information about networks.
  - name: Protocols
    description: Get information about cross-chain protocols.
  - name: Token transfers
    description: Get information about token transfers.
paths:
  /v1/protocols/transactions:
    post:
      tags:
        - Protocols
      summary: Get all cross-chain transactions
      description: Returns a list of cross-chain transactions with filters
      operationId: getTransactions
      parameters:
        - name: page
          required: false
          in: query
          description: Page number "offset"
          schema:
            example: '0'
            type: string
        - name: pageSize
          required: false
          in: query
          description: Page size
          schema:
            type: string
        - name: useScroll
          required: false
          in: query
          description: Whether to use scroll API for pagination
          schema:
            default: false
            type: boolean
        - name: scrollBatchSize
          required: false
          in: query
          description: Batch size for scroll requests
          schema:
            default: 100
            type: number
        - name: hasMore
          required: false
          in: query
          description: Whether there are more results available (only when useScroll=true)
          schema:
            type: boolean
        - name: protocol
          required: false
          in: query
          description: Protocol type filter
          schema:
            example: IBC
            type: string
        - name: address
          required: false
          in: query
          description: Address filter
          schema:
            example: cosmos1...
            type: string
        - name: senderNetwork
          required: false
          in: query
          description: Sender network filter
          schema:
            example: cosmoshub-4
            type: string
        - name: receiverNetwork
          required: false
          in: query
          description: Receiver network filter
          schema:
            example: osmosis-1
            type: string
        - name: asset
          required: false
          in: query
          description: Asset filter
          schema:
            example: uatom
            type: string
        - name: startTime
          required: false
          in: query
          description: Start time filter (ISO 8601 string)
          schema:
            example: '2023-01-01T00:00:00Z'
            type: string
        - name: endTime
          required: false
          in: query
          description: End time filter (ISO 8601 string)
          schema:
            example: '2023-12-31T23:59:59Z'
            type: string
        - name: direction
          required: false
          in: query
          description: Direction filter (incoming/outgoing)
          schema:
            example: incoming
            type: string
            enum:
              - incoming
              - outgoing
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ScrollIdDTO'
      responses:
        '200':
          description: List of cross-chain transactions
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CrossChainTransactionsResponseDTO'
        '201':
          description: ''
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CrossChainTransactionsResponseDTO'
components:
  schemas:
    ScrollIdDTO:
      type: object
      properties:
        scrollId:
          type: string
          description: Scroll ID for pagination (only when useScroll=true)
    CrossChainTransactionsResponseDTO:
      type: object
      properties:
        scrollId:
          type: string
          description: Scroll ID for pagination (only when useScroll=true)
        hasMore:
          type: boolean
          description: Whether there are more results available (only when useScroll=true)
        transactions:
          description: Array of cross-chain transactions
          type: array
          items:
            $ref: '#/components/schemas/CrossChainTransactionDTO'
        count:
          type: number
          description: Total count of transactions
      required:
        - transactions
    CrossChainTransactionDTO:
      type: object
      properties:
        id:
          type: string
          description: Transaction ID
        sender:
          type: string
          description: Sender address
        senderEntity:
          type: string
          description: Sender entity
        senderName:
          type: string
          description: Sender name
        senderAsset:
          type: string
          description: Sender asset
        senderAmount:
          type: number
          description: Sender amount
        senderTransactionHash:
          type: string
          description: Sender transaction hash
        senderChain:
          type: string
          description: Sender chain
        receiver:
          type: string
          description: Receiver address
        receiverEntity:
          type: string
          description: Receiver entity
        receiverName:
          type: string
          description: Receiver name
        receiverAsset:
          type: string
          description: Receiver asset
        receiverAmount:
          type: number
          description: Receiver amount
        receiverTransactionHash:
          type: string
          description: Receiver transaction hash
        receiverChain:
          type: string
          description: Receiver chain
        timestamp:
          format: date-time
          type: string
          description: Transaction timestamp
        protocol:
          type: string
          description: Protocol type
        usdValue:
          type: number
          description: USD value
        status:
          type: string
          description: Transaction status
      required:
        - id
        - sender
        - senderAsset
        - senderAmount
        - senderTransactionHash
        - senderChain
        - receiver
        - receiverAsset
        - receiverAmount
        - receiverTransactionHash
        - receiverChain
        - timestamp
        - protocol
        - usdValue
  securitySchemes:
    Authorization:
      type: http
      scheme: bearer
      bearerFormat: API Key
      description: 'Use Authorization: Bearer <api-key>'

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.range.org/llms.txt

# Get all cross-chain transactions

> Returns a list of cross-chain transactions with filters



## OpenAPI

````yaml api-reference/data-api.json post /v1/protocols/transactions
openapi: 3.0.0
info:
  title: Range Data API
  description: >-
    The Range Data API for crypto addresses, networks, transactions, and
    entities.
  version: '1.0'
  contact: {}
servers:
  - url: https://api.range.org
    description: Range API Server
security:
  - Authorization: []
tags:
  - name: Address Information
    description: Get information about a crypto address.
  - name: Entity Information
    description: Get information about entities.
  - name: Network Information
    description: Get information about networks.
  - name: Protocols
    description: Get information about cross-chain protocols.
  - name: Token transfers
    description: Get information about token transfers.
paths:
  /v1/protocols/transactions:
    post:
      tags:
        - Protocols
      summary: Get all cross-chain transactions
      description: Returns a list of cross-chain transactions with filters
      operationId: getTransactions
      parameters:
        - name: page
          required: false
          in: query
          description: Page number "offset"
          schema:
            example: '0'
            type: string
        - name: pageSize
          required: false
          in: query
          description: Page size
          schema:
            type: string
        - name: useScroll
          required: false
          in: query
          description: Whether to use scroll API for pagination
          schema:
            default: false
            type: boolean
        - name: scrollBatchSize
          required: false
          in: query
          description: Batch size for scroll requests
          schema:
            default: 100
            type: number
        - name: hasMore
          required: false
          in: query
          description: Whether there are more results available (only when useScroll=true)
          schema:
            type: boolean
        - name: protocol
          required: false
          in: query
          description: Protocol type filter
          schema:
            example: IBC
            type: string
        - name: address
          required: false
          in: query
          description: Address filter
          schema:
            example: cosmos1...
            type: string
        - name: senderNetwork
          required: false
          in: query
          description: Sender network filter
          schema:
            example: cosmoshub-4
            type: string
        - name: receiverNetwork
          required: false
          in: query
          description: Receiver network filter
          schema:
            example: osmosis-1
            type: string
        - name: asset
          required: false
          in: query
          description: Asset filter
          schema:
            example: uatom
            type: string
        - name: startTime
          required: false
          in: query
          description: Start time filter (ISO 8601 string)
          schema:
            example: '2023-01-01T00:00:00Z'
            type: string
        - name: endTime
          required: false
          in: query
          description: End time filter (ISO 8601 string)
          schema:
            example: '2023-12-31T23:59:59Z'
            type: string
        - name: direction
          required: false
          in: query
          description: Direction filter (incoming/outgoing)
          schema:
            example: incoming
            type: string
            enum:
              - incoming
              - outgoing
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ScrollIdDTO'
      responses:
        '200':
          description: List of cross-chain transactions
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CrossChainTransactionsResponseDTO'
        '201':
          description: ''
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CrossChainTransactionsResponseDTO'
components:
  schemas:
    ScrollIdDTO:
      type: object
      properties:
        scrollId:
          type: string
          description: Scroll ID for pagination (only when useScroll=true)
    CrossChainTransactionsResponseDTO:
      type: object
      properties:
        scrollId:
          type: string
          description: Scroll ID for pagination (only when useScroll=true)
        hasMore:
          type: boolean
          description: Whether there are more results available (only when useScroll=true)
        transactions:
          description: Array of cross-chain transactions
          type: array
          items:
            $ref: '#/components/schemas/CrossChainTransactionDTO'
        count:
          type: number
          description: Total count of transactions
      required:
        - transactions
    CrossChainTransactionDTO:
      type: object
      properties:
        id:
          type: string
          description: Transaction ID
        sender:
          type: string
          description: Sender address
        senderEntity:
          type: string
          description: Sender entity
        senderName:
          type: string
          description: Sender name
        senderAsset:
          type: string
          description: Sender asset
        senderAmount:
          type: number
          description: Sender amount
        senderTransactionHash:
          type: string
          description: Sender transaction hash
        senderChain:
          type: string
          description: Sender chain
        receiver:
          type: string
          description: Receiver address
        receiverEntity:
          type: string
          description: Receiver entity
        receiverName:
          type: string
          description: Receiver name
        receiverAsset:
          type: string
          description: Receiver asset
        receiverAmount:
          type: number
          description: Receiver amount
        receiverTransactionHash:
          type: string
          description: Receiver transaction hash
        receiverChain:
          type: string
          description: Receiver chain
        timestamp:
          format: date-time
          type: string
          description: Transaction timestamp
        protocol:
          type: string
          description: Protocol type
        usdValue:
          type: number
          description: USD value
        status:
          type: string
          description: Transaction status
      required:
        - id
        - sender
        - senderAsset
        - senderAmount
        - senderTransactionHash
        - senderChain
        - receiver
        - receiverAsset
        - receiverAmount
        - receiverTransactionHash
        - receiverChain
        - timestamp
        - protocol
        - usdValue
  securitySchemes:
    Authorization:
      type: http
      scheme: bearer
      bearerFormat: API Key
      description: 'Use Authorization: Bearer <api-key>'

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.range.org/llms.txt

# Get all cross-chain transactions

> Returns a list of cross-chain transactions with filters



## OpenAPI

````yaml api-reference/data-api.json post /v1/protocols/transactions
openapi: 3.0.0
info:
  title: Range Data API
  description: >-
    The Range Data API for crypto addresses, networks, transactions, and
    entities.
  version: '1.0'
  contact: {}
servers:
  - url: https://api.range.org
    description: Range API Server
security:
  - Authorization: []
tags:
  - name: Address Information
    description: Get information about a crypto address.
  - name: Entity Information
    description: Get information about entities.
  - name: Network Information
    description: Get information about networks.
  - name: Protocols
    description: Get information about cross-chain protocols.
  - name: Token transfers
    description: Get information about token transfers.
paths:
  /v1/protocols/transactions:
    post:
      tags:
        - Protocols
      summary: Get all cross-chain transactions
      description: Returns a list of cross-chain transactions with filters
      operationId: getTransactions
      parameters:
        - name: page
          required: false
          in: query
          description: Page number "offset"
          schema:
            example: '0'
            type: string
        - name: pageSize
          required: false
          in: query
          description: Page size
          schema:
            type: string
        - name: useScroll
          required: false
          in: query
          description: Whether to use scroll API for pagination
          schema:
            default: false
            type: boolean
        - name: scrollBatchSize
          required: false
          in: query
          description: Batch size for scroll requests
          schema:
            default: 100
            type: number
        - name: hasMore
          required: false
          in: query
          description: Whether there are more results available (only when useScroll=true)
          schema:
            type: boolean
        - name: protocol
          required: false
          in: query
          description: Protocol type filter
          schema:
            example: IBC
            type: string
        - name: address
          required: false
          in: query
          description: Address filter
          schema:
            example: cosmos1...
            type: string
        - name: senderNetwork
          required: false
          in: query
          description: Sender network filter
          schema:
            example: cosmoshub-4
            type: string
        - name: receiverNetwork
          required: false
          in: query
          description: Receiver network filter
          schema:
            example: osmosis-1
            type: string
        - name: asset
          required: false
          in: query
          description: Asset filter
          schema:
            example: uatom
            type: string
        - name: startTime
          required: false
          in: query
          description: Start time filter (ISO 8601 string)
          schema:
            example: '2023-01-01T00:00:00Z'
            type: string
        - name: endTime
          required: false
          in: query
          description: End time filter (ISO 8601 string)
          schema:
            example: '2023-12-31T23:59:59Z'
            type: string
        - name: direction
          required: false
          in: query
          description: Direction filter (incoming/outgoing)
          schema:
            example: incoming
            type: string
            enum:
              - incoming
              - outgoing
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ScrollIdDTO'
      responses:
        '200':
          description: List of cross-chain transactions
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CrossChainTransactionsResponseDTO'
        '201':
          description: ''
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CrossChainTransactionsResponseDTO'
components:
  schemas:
    ScrollIdDTO:
      type: object
      properties:
        scrollId:
          type: string
          description: Scroll ID for pagination (only when useScroll=true)
    CrossChainTransactionsResponseDTO:
      type: object
      properties:
        scrollId:
          type: string
          description: Scroll ID for pagination (only when useScroll=true)
        hasMore:
          type: boolean
          description: Whether there are more results available (only when useScroll=true)
        transactions:
          description: Array of cross-chain transactions
          type: array
          items:
            $ref: '#/components/schemas/CrossChainTransactionDTO'
        count:
          type: number
          description: Total count of transactions
      required:
        - transactions
    CrossChainTransactionDTO:
      type: object
      properties:
        id:
          type: string
          description: Transaction ID
        sender:
          type: string
          description: Sender address
        senderEntity:
          type: string
          description: Sender entity
        senderName:
          type: string
          description: Sender name
        senderAsset:
          type: string
          description: Sender asset
        senderAmount:
          type: number
          description: Sender amount
        senderTransactionHash:
          type: string
          description: Sender transaction hash
        senderChain:
          type: string
          description: Sender chain
        receiver:
          type: string
          description: Receiver address
        receiverEntity:
          type: string
          description: Receiver entity
        receiverName:
          type: string
          description: Receiver name
        receiverAsset:
          type: string
          description: Receiver asset
        receiverAmount:
          type: number
          description: Receiver amount
        receiverTransactionHash:
          type: string
          description: Receiver transaction hash
        receiverChain:
          type: string
          description: Receiver chain
        timestamp:
          format: date-time
          type: string
          description: Transaction timestamp
        protocol:
          type: string
          description: Protocol type
        usdValue:
          type: number
          description: USD value
        status:
          type: string
          description: Transaction status
      required:
        - id
        - sender
        - senderAsset
        - senderAmount
        - senderTransactionHash
        - senderChain
        - receiver
        - receiverAsset
        - receiverAmount
        - receiverTransactionHash
        - receiverChain
        - timestamp
        - protocol
        - usdValue
  securitySchemes:
    Authorization:
      type: http
      scheme: bearer
      bearerFormat: API Key
      description: 'Use Authorization: Bearer <api-key>'

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.range.org/llms.txt

# Get all cross-chain transactions

> Returns a list of cross-chain transactions with filters



## OpenAPI

````yaml api-reference/data-api.json post /v1/protocols/transactions
openapi: 3.0.0
info:
  title: Range Data API
  description: >-
    The Range Data API for crypto addresses, networks, transactions, and
    entities.
  version: '1.0'
  contact: {}
servers:
  - url: https://api.range.org
    description: Range API Server
security:
  - Authorization: []
tags:
  - name: Address Information
    description: Get information about a crypto address.
  - name: Entity Information
    description: Get information about entities.
  - name: Network Information
    description: Get information about networks.
  - name: Protocols
    description: Get information about cross-chain protocols.
  - name: Token transfers
    description: Get information about token transfers.
paths:
  /v1/protocols/transactions:
    post:
      tags:
        - Protocols
      summary: Get all cross-chain transactions
      description: Returns a list of cross-chain transactions with filters
      operationId: getTransactions
      parameters:
        - name: page
          required: false
          in: query
          description: Page number "offset"
          schema:
            example: '0'
            type: string
        - name: pageSize
          required: false
          in: query
          description: Page size
          schema:
            type: string
        - name: useScroll
          required: false
          in: query
          description: Whether to use scroll API for pagination
          schema:
            default: false
            type: boolean
        - name: scrollBatchSize
          required: false
          in: query
          description: Batch size for scroll requests
          schema:
            default: 100
            type: number
        - name: hasMore
          required: false
          in: query
          description: Whether there are more results available (only when useScroll=true)
          schema:
            type: boolean
        - name: protocol
          required: false
          in: query
          description: Protocol type filter
          schema:
            example: IBC
            type: string
        - name: address
          required: false
          in: query
          description: Address filter
          schema:
            example: cosmos1...
            type: string
        - name: senderNetwork
          required: false
          in: query
          description: Sender network filter
          schema:
            example: cosmoshub-4
            type: string
        - name: receiverNetwork
          required: false
          in: query
          description: Receiver network filter
          schema:
            example: osmosis-1
            type: string
        - name: asset
          required: false
          in: query
          description: Asset filter
          schema:
            example: uatom
            type: string
        - name: startTime
          required: false
          in: query
          description: Start time filter (ISO 8601 string)
          schema:
            example: '2023-01-01T00:00:00Z'
            type: string
        - name: endTime
          required: false
          in: query
          description: End time filter (ISO 8601 string)
          schema:
            example: '2023-12-31T23:59:59Z'
            type: string
        - name: direction
          required: false
          in: query
          description: Direction filter (incoming/outgoing)
          schema:
            example: incoming
            type: string
            enum:
              - incoming
              - outgoing
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ScrollIdDTO'
      responses:
        '200':
          description: List of cross-chain transactions
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CrossChainTransactionsResponseDTO'
        '201':
          description: ''
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CrossChainTransactionsResponseDTO'
components:
  schemas:
    ScrollIdDTO:
      type: object
      properties:
        scrollId:
          type: string
          description: Scroll ID for pagination (only when useScroll=true)
    CrossChainTransactionsResponseDTO:
      type: object
      properties:
        scrollId:
          type: string
          description: Scroll ID for pagination (only when useScroll=true)
        hasMore:
          type: boolean
          description: Whether there are more results available (only when useScroll=true)
        transactions:
          description: Array of cross-chain transactions
          type: array
          items:
            $ref: '#/components/schemas/CrossChainTransactionDTO'
        count:
          type: number
          description: Total count of transactions
      required:
        - transactions
    CrossChainTransactionDTO:
      type: object
      properties:
        id:
          type: string
          description: Transaction ID
        sender:
          type: string
          description: Sender address
        senderEntity:
          type: string
          description: Sender entity
        senderName:
          type: string
          description: Sender name
        senderAsset:
          type: string
          description: Sender asset
        senderAmount:
          type: number
          description: Sender amount
        senderTransactionHash:
          type: string
          description: Sender transaction hash
        senderChain:
          type: string
          description: Sender chain
        receiver:
          type: string
          description: Receiver address
        receiverEntity:
          type: string
          description: Receiver entity
        receiverName:
          type: string
          description: Receiver name
        receiverAsset:
          type: string
          description: Receiver asset
        receiverAmount:
          type: number
          description: Receiver amount
        receiverTransactionHash:
          type: string
          description: Receiver transaction hash
        receiverChain:
          type: string
          description: Receiver chain
        timestamp:
          format: date-time
          type: string
          description: Transaction timestamp
        protocol:
          type: string
          description: Protocol type
        usdValue:
          type: number
          description: USD value
        status:
          type: string
          description: Transaction status
      required:
        - id
        - sender
        - senderAsset
        - senderAmount
        - senderTransactionHash
        - senderChain
        - receiver
        - receiverAsset
        - receiverAmount
        - receiverTransactionHash
        - receiverChain
        - timestamp
        - protocol
        - usdValue
  securitySchemes:
    Authorization:
      type: http
      scheme: bearer
      bearerFormat: API Key
      description: 'Use Authorization: Bearer <api-key>'

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.range.org/llms.txt

# Get all cross-chain transactions

> Returns a list of cross-chain transactions with filters



## OpenAPI

````yaml api-reference/data-api.json post /v1/protocols/transactions
openapi: 3.0.0
info:
  title: Range Data API
  description: >-
    The Range Data API for crypto addresses, networks, transactions, and
    entities.
  version: '1.0'
  contact: {}
servers:
  - url: https://api.range.org
    description: Range API Server
security:
  - Authorization: []
tags:
  - name: Address Information
    description: Get information about a crypto address.
  - name: Entity Information
    description: Get information about entities.
  - name: Network Information
    description: Get information about networks.
  - name: Protocols
    description: Get information about cross-chain protocols.
  - name: Token transfers
    description: Get information about token transfers.
paths:
  /v1/protocols/transactions:
    post:
      tags:
        - Protocols
      summary: Get all cross-chain transactions
      description: Returns a list of cross-chain transactions with filters
      operationId: getTransactions
      parameters:
        - name: page
          required: false
          in: query
          description: Page number "offset"
          schema:
            example: '0'
            type: string
        - name: pageSize
          required: false
          in: query
          description: Page size
          schema:
            type: string
        - name: useScroll
          required: false
          in: query
          description: Whether to use scroll API for pagination
          schema:
            default: false
            type: boolean
        - name: scrollBatchSize
          required: false
          in: query
          description: Batch size for scroll requests
          schema:
            default: 100
            type: number
        - name: hasMore
          required: false
          in: query
          description: Whether there are more results available (only when useScroll=true)
          schema:
            type: boolean
        - name: protocol
          required: false
          in: query
          description: Protocol type filter
          schema:
            example: IBC
            type: string
        - name: address
          required: false
          in: query
          description: Address filter
          schema:
            example: cosmos1...
            type: string
        - name: senderNetwork
          required: false
          in: query
          description: Sender network filter
          schema:
            example: cosmoshub-4
            type: string
        - name: receiverNetwork
          required: false
          in: query
          description: Receiver network filter
          schema:
            example: osmosis-1
            type: string
        - name: asset
          required: false
          in: query
          description: Asset filter
          schema:
            example: uatom
            type: string
        - name: startTime
          required: false
          in: query
          description: Start time filter (ISO 8601 string)
          schema:
            example: '2023-01-01T00:00:00Z'
            type: string
        - name: endTime
          required: false
          in: query
          description: End time filter (ISO 8601 string)
          schema:
            example: '2023-12-31T23:59:59Z'
            type: string
        - name: direction
          required: false
          in: query
          description: Direction filter (incoming/outgoing)
          schema:
            example: incoming
            type: string
            enum:
              - incoming
              - outgoing
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ScrollIdDTO'
      responses:
        '200':
          description: List of cross-chain transactions
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CrossChainTransactionsResponseDTO'
        '201':
          description: ''
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CrossChainTransactionsResponseDTO'
components:
  schemas:
    ScrollIdDTO:
      type: object
      properties:
        scrollId:
          type: string
          description: Scroll ID for pagination (only when useScroll=true)
    CrossChainTransactionsResponseDTO:
      type: object
      properties:
        scrollId:
          type: string
          description: Scroll ID for pagination (only when useScroll=true)
        hasMore:
          type: boolean
          description: Whether there are more results available (only when useScroll=true)
        transactions:
          description: Array of cross-chain transactions
          type: array
          items:
            $ref: '#/components/schemas/CrossChainTransactionDTO'
        count:
          type: number
          description: Total count of transactions
      required:
        - transactions
    CrossChainTransactionDTO:
      type: object
      properties:
        id:
          type: string
          description: Transaction ID
        sender:
          type: string
          description: Sender address
        senderEntity:
          type: string
          description: Sender entity
        senderName:
          type: string
          description: Sender name
        senderAsset:
          type: string
          description: Sender asset
        senderAmount:
          type: number
          description: Sender amount
        senderTransactionHash:
          type: string
          description: Sender transaction hash
        senderChain:
          type: string
          description: Sender chain
        receiver:
          type: string
          description: Receiver address
        receiverEntity:
          type: string
          description: Receiver entity
        receiverName:
          type: string
          description: Receiver name
        receiverAsset:
          type: string
          description: Receiver asset
        receiverAmount:
          type: number
          description: Receiver amount
        receiverTransactionHash:
          type: string
          description: Receiver transaction hash
        receiverChain:
          type: string
          description: Receiver chain
        timestamp:
          format: date-time
          type: string
          description: Transaction timestamp
        protocol:
          type: string
          description: Protocol type
        usdValue:
          type: number
          description: USD value
        status:
          type: string
          description: Transaction status
      required:
        - id
        - sender
        - senderAsset
        - senderAmount
        - senderTransactionHash
        - senderChain
        - receiver
        - receiverAsset
        - receiverAmount
        - receiverTransactionHash
        - receiverChain
        - timestamp
        - protocol
        - usdValue
  securitySchemes:
    Authorization:
      type: http
      scheme: bearer
      bearerFormat: API Key
      description: 'Use Authorization: Bearer <api-key>'

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.range.org/llms.txt

# Get token transfers

> Returns a list of token transfers that match the specified search term.



## OpenAPI

````yaml api-reference/data-api.json get /v2/transfers
openapi: 3.0.0
info:
  title: Range Data API
  description: >-
    The Range Data API for crypto addresses, networks, transactions, and
    entities.
  version: '1.0'
  contact: {}
servers:
  - url: https://api.range.org
    description: Range API Server
security:
  - Authorization: []
tags:
  - name: Address Information
    description: Get information about a crypto address.
  - name: Entity Information
    description: Get information about entities.
  - name: Network Information
    description: Get information about networks.
  - name: Protocols
    description: Get information about cross-chain protocols.
  - name: Token transfers
    description: Get information about token transfers.
paths:
  /v2/transfers:
    get:
      tags:
        - Token transfers
      summary: Get token transfers
      description: Returns a list of token transfers that match the specified search term.
      operationId: searchTransfers
      parameters:
        - name: explorer
          required: false
          in: query
          schema:
            example: solana
            type: string
        - name: cursor
          required: false
          in: query
          schema:
            example: n0192376853
            type: string
        - name: sort
          required: false
          in: query
          schema:
            example: usd
            type: string
            enum:
              - usd
        - name: size
          required: false
          in: query
          schema:
            minimum: 1
            maximum: 100
            default: 25
            example: 10
            type: number
        - name: tx_hash
          required: false
          in: query
          schema:
            example: '0xbe667b06979c46e186cebb4ad2c6fb6af8fb034e4723518416b2e7d3aeeb4753'
            type: string
        - name: source_networks
          required: false
          in: query
          schema:
            example: eth,solana
            type: array
            items:
              type: string
        - name: destination_networks
          required: false
          in: query
          schema:
            example: eth,solana
            type: array
            items:
              type: string
        - name: network
          required: false
          in: query
          description: Only find transfers on one specific network
          schema:
            example: cosmoshub-4
            type: string
        - name: address
          required: false
          in: query
          description: Only find transfers on one specific address
          schema:
            example: C6RarBbo5zxMzFiVhYAvbGUWiJGuVsSczawdXdGzeEoj
            type: string
        - name: search_string
          required: false
          in: query
          schema:
            example: e.g. partial address
            type: string
        - name: status
          required: false
          in: query
          description: >-
            Current status(es) of the transfer, comma-separated (e.g.
            'SUCCEEDED,FAILED')
          schema:
            example: SUCCEEDED,FAILED
            type: array
            items:
              type: string
              enum:
                - SUCCEEDED
                - PENDING
                - ERROR_ON_DESTINATION
                - TIMEOUT
        - name: bridges
          required: false
          in: query
          description: Bridges or networks used for the transfer
          schema:
            example: ibc,cctp
            type: array
            items:
              type: string
        - name: token_symbols
          required: false
          in: query
          description: Token symbols involved in the transfer
          schema:
            example: USDC,DAI
            type: array
            items:
              type: string
        - name: min_usd
          required: false
          in: query
          description: Minimum USD amount (decimal). Converted to number.
          schema:
            example: '100.50'
            type: number
        - name: max_usd
          required: false
          in: query
          description: Maximum USD amount (decimal). Converted to number.
          schema:
            example: '1000'
            type: number
        - name: start_time
          required: false
          in: query
          description: Start time (ISO 8601). Converted to Date.
          schema:
            format: date-time
            example: '2025-01-01T00:00:00Z'
            type: string
        - name: end_time
          required: false
          in: query
          description: End time (ISO 8601). Converted to Date.
          schema:
            format: date-time
            example: '2025-12-31T23:59:59Z'
            type: string
        - name: scope
          required: false
          in: query
          schema:
            type: string
            enum:
              - INTERCHAIN
              - INTRACHAIN
              - ALL
      responses:
        '200':
          description: List of token transfers that match the specified search term.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SearchTransfersResponseDto'
components:
  schemas:
    SearchTransfersResponseDto:
      type: object
      properties:
        items:
          type: array
          items:
            $ref: '#/components/schemas/TransferDto'
        meta:
          $ref: '#/components/schemas/CursorMetaDto'
      required:
        - items
        - meta
    TransferDto:
      type: object
      properties:
        id:
          type: string
          example: 9359/AX/2352
        time:
          type: string
          example: '2024-05-08T13:05:57.779Z'
        status:
          enum:
            - SUCCEEDED
            - PENDING
            - ERROR_ON_DESTINATION
            - TIMEOUT
          type: string
          example: SUCCEEDED
          description: Current status of the transfer
        type:
          type: string
          example: cctp
          description: Type of transfer (e.g., ibc, cctp, etc.)
        sender:
          description: Information about the sender of the transfer
          example:
            address: AuZrspySopxfZUiXY6YxDyfS211KvXLe197kj3M2cLpq
            network: solana
            label: Scammer
            malicious: true
            icon_urls:
              - https://example.com/solana.png
            token:
              amount: 27.18
              symbol: USDC
              usd: 27.24
              icon_url: https://example.com/usdc.png
          allOf:
            - $ref: '#/components/schemas/AccountDto'
        receiver:
          description: Information about the receiver of the transfer
          example:
            address: noble14h2xp3fcfsgwmr24wrurfpv5t0chaal238k9wq
            network: noble-1
            icon_urls:
              - https://example.com/noble.png
            token:
              amount: 27.18
              symbol: USDC
              usd: 27.24
              icon_url: https://example.com/usdc.png
          allOf:
            - $ref: '#/components/schemas/AccountDto'
        sender_tx_hash:
          type: string
          example: 76b9922b6c8968d328e56930b4bbe26665d2ed12f2bdff45b2e9a43b09f5ab9c
        receiver_tx_hash:
          type: string
          example: e607dba4c1e138dabb1d534ba0e14645786ca892907563c388d7de7f65ba7bb3
      required:
        - id
        - time
        - status
        - type
        - sender
        - receiver
    CursorMetaDto:
      type: object
      properties:
        next_cursor:
          type: string
          nullable: true
          description: >-
            Opaque string cursor pointing to the next page of results. null if
            there is no next page.
          example: eyJpZCI6IjkxeFFlV3Z...
        previous_cursor:
          type: string
          nullable: true
          description: >-
            Opaque string cursor pointing to the previous page of results. null
            if there is no previous page.
          example: eyJpZCI6IjkxeFFlV3Z...
        first_page_cursor:
          type: string
          description: >-
            Opaque string cursor pointing to the very first page in the entire
            dataset with respect to the current filter.
          example: eyJpZCI6IjkxeFFlV3Z...
        last_page_cursor:
          type: string
          nullable: true
          description: >-
            Opaque string cursor pointing to the very last page in the entire
            dataset with respect to the current filter.
          example: eyJpZCI6IjkxeFFlV3Z...
        total_count:
          type: number
          nullable: true
          description: Total number of results.
          example: 100
        page_number:
          type: number
          description: Current page number.
          example: 1
    AccountDto:
      type: object
      properties:
        address:
          type: string
          example: '0x1bf77b6b39ff49c39764776fb9f659f5dbbcdd24'
        network:
          type: string
          example: eth
        icon_urls:
          example:
            - https://example.com/eth.png
          description: List of icon URLs associated with this network or participant
          type: array
          items:
            type: string
        token:
          description: Token information
          example:
            amount: 27.18
            symbol: USDC
            usd: 27.24
            icon_url: https://example.com/usdc.png
          allOf:
            - $ref: '#/components/schemas/TokenDto'
        label:
          type: string
          example: Scammer / Address Poinsoning
        malicious:
          type: boolean
          example: true
      required:
        - address
        - network
        - icon_urls
        - token
    TokenDto:
      type: object
      properties:
        amount:
          type: number
          example: 27.18
          description: Amount of the token transferred
        symbol:
          type: string
          example: USDC
          description: Token denomination being transferred
        usd:
          type: number
          example: 27.24
          description: USD equivalent of the amount transferred
        icon_url:
          type: string
          example: https://example.com/usdc.png
          description: URL to the token symbol
      required:
        - amount
        - symbol
  securitySchemes:
    Authorization:
      type: http
      scheme: bearer
      bearerFormat: API Key
      description: 'Use Authorization: Bearer <api-key>'

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.range.org/llms.txt

# Get token transfers

> Returns a list of token transfers that match the specified search term.



## OpenAPI

````yaml api-reference/data-api.json get /v2/transfers
openapi: 3.0.0
info:
  title: Range Data API
  description: >-
    The Range Data API for crypto addresses, networks, transactions, and
    entities.
  version: '1.0'
  contact: {}
servers:
  - url: https://api.range.org
    description: Range API Server
security:
  - Authorization: []
tags:
  - name: Address Information
    description: Get information about a crypto address.
  - name: Entity Information
    description: Get information about entities.
  - name: Network Information
    description: Get information about networks.
  - name: Protocols
    description: Get information about cross-chain protocols.
  - name: Token transfers
    description: Get information about token transfers.
paths:
  /v2/transfers:
    get:
      tags:
        - Token transfers
      summary: Get token transfers
      description: Returns a list of token transfers that match the specified search term.
      operationId: searchTransfers
      parameters:
        - name: explorer
          required: false
          in: query
          schema:
            example: solana
            type: string
        - name: cursor
          required: false
          in: query
          schema:
            example: n0192376853
            type: string
        - name: sort
          required: false
          in: query
          schema:
            example: usd
            type: string
            enum:
              - usd
        - name: size
          required: false
          in: query
          schema:
            minimum: 1
            maximum: 100
            default: 25
            example: 10
            type: number
        - name: tx_hash
          required: false
          in: query
          schema:
            example: '0xbe667b06979c46e186cebb4ad2c6fb6af8fb034e4723518416b2e7d3aeeb4753'
            type: string
        - name: source_networks
          required: false
          in: query
          schema:
            example: eth,solana
            type: array
            items:
              type: string
        - name: destination_networks
          required: false
          in: query
          schema:
            example: eth,solana
            type: array
            items:
              type: string
        - name: network
          required: false
          in: query
          description: Only find transfers on one specific network
          schema:
            example: cosmoshub-4
            type: string
        - name: address
          required: false
          in: query
          description: Only find transfers on one specific address
          schema:
            example: C6RarBbo5zxMzFiVhYAvbGUWiJGuVsSczawdXdGzeEoj
            type: string
        - name: search_string
          required: false
          in: query
          schema:
            example: e.g. partial address
            type: string
        - name: status
          required: false
          in: query
          description: >-
            Current status(es) of the transfer, comma-separated (e.g.
            'SUCCEEDED,FAILED')
          schema:
            example: SUCCEEDED,FAILED
            type: array
            items:
              type: string
              enum:
                - SUCCEEDED
                - PENDING
                - ERROR_ON_DESTINATION
                - TIMEOUT
        - name: bridges
          required: false
          in: query
          description: Bridges or networks used for the transfer
          schema:
            example: ibc,cctp
            type: array
            items:
              type: string
        - name: token_symbols
          required: false
          in: query
          description: Token symbols involved in the transfer
          schema:
            example: USDC,DAI
            type: array
            items:
              type: string
        - name: min_usd
          required: false
          in: query
          description: Minimum USD amount (decimal). Converted to number.
          schema:
            example: '100.50'
            type: number
        - name: max_usd
          required: false
          in: query
          description: Maximum USD amount (decimal). Converted to number.
          schema:
            example: '1000'
            type: number
        - name: start_time
          required: false
          in: query
          description: Start time (ISO 8601). Converted to Date.
          schema:
            format: date-time
            example: '2025-01-01T00:00:00Z'
            type: string
        - name: end_time
          required: false
          in: query
          description: End time (ISO 8601). Converted to Date.
          schema:
            format: date-time
            example: '2025-12-31T23:59:59Z'
            type: string
        - name: scope
          required: false
          in: query
          schema:
            type: string
            enum:
              - INTERCHAIN
              - INTRACHAIN
              - ALL
      responses:
        '200':
          description: List of token transfers that match the specified search term.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SearchTransfersResponseDto'
components:
  schemas:
    SearchTransfersResponseDto:
      type: object
      properties:
        items:
          type: array
          items:
            $ref: '#/components/schemas/TransferDto'
        meta:
          $ref: '#/components/schemas/CursorMetaDto'
      required:
        - items
        - meta
    TransferDto:
      type: object
      properties:
        id:
          type: string
          example: 9359/AX/2352
        time:
          type: string
          example: '2024-05-08T13:05:57.779Z'
        status:
          enum:
            - SUCCEEDED
            - PENDING
            - ERROR_ON_DESTINATION
            - TIMEOUT
          type: string
          example: SUCCEEDED
          description: Current status of the transfer
        type:
          type: string
          example: cctp
          description: Type of transfer (e.g., ibc, cctp, etc.)
        sender:
          description: Information about the sender of the transfer
          example:
            address: AuZrspySopxfZUiXY6YxDyfS211KvXLe197kj3M2cLpq
            network: solana
            label: Scammer
            malicious: true
            icon_urls:
              - https://example.com/solana.png
            token:
              amount: 27.18
              symbol: USDC
              usd: 27.24
              icon_url: https://example.com/usdc.png
          allOf:
            - $ref: '#/components/schemas/AccountDto'
        receiver:
          description: Information about the receiver of the transfer
          example:
            address: noble14h2xp3fcfsgwmr24wrurfpv5t0chaal238k9wq
            network: noble-1
            icon_urls:
              - https://example.com/noble.png
            token:
              amount: 27.18
              symbol: USDC
              usd: 27.24
              icon_url: https://example.com/usdc.png
          allOf:
            - $ref: '#/components/schemas/AccountDto'
        sender_tx_hash:
          type: string
          example: 76b9922b6c8968d328e56930b4bbe26665d2ed12f2bdff45b2e9a43b09f5ab9c
        receiver_tx_hash:
          type: string
          example: e607dba4c1e138dabb1d534ba0e14645786ca892907563c388d7de7f65ba7bb3
      required:
        - id
        - time
        - status
        - type
        - sender
        - receiver
    CursorMetaDto:
      type: object
      properties:
        next_cursor:
          type: string
          nullable: true
          description: >-
            Opaque string cursor pointing to the next page of results. null if
            there is no next page.
          example: eyJpZCI6IjkxeFFlV3Z...
        previous_cursor:
          type: string
          nullable: true
          description: >-
            Opaque string cursor pointing to the previous page of results. null
            if there is no previous page.
          example: eyJpZCI6IjkxeFFlV3Z...
        first_page_cursor:
          type: string
          description: >-
            Opaque string cursor pointing to the very first page in the entire
            dataset with respect to the current filter.
          example: eyJpZCI6IjkxeFFlV3Z...
        last_page_cursor:
          type: string
          nullable: true
          description: >-
            Opaque string cursor pointing to the very last page in the entire
            dataset with respect to the current filter.
          example: eyJpZCI6IjkxeFFlV3Z...
        total_count:
          type: number
          nullable: true
          description: Total number of results.
          example: 100
        page_number:
          type: number
          description: Current page number.
          example: 1
    AccountDto:
      type: object
      properties:
        address:
          type: string
          example: '0x1bf77b6b39ff49c39764776fb9f659f5dbbcdd24'
        network:
          type: string
          example: eth
        icon_urls:
          example:
            - https://example.com/eth.png
          description: List of icon URLs associated with this network or participant
          type: array
          items:
            type: string
        token:
          description: Token information
          example:
            amount: 27.18
            symbol: USDC
            usd: 27.24
            icon_url: https://example.com/usdc.png
          allOf:
            - $ref: '#/components/schemas/TokenDto'
        label:
          type: string
          example: Scammer / Address Poinsoning
        malicious:
          type: boolean
          example: true
      required:
        - address
        - network
        - icon_urls
        - token
    TokenDto:
      type: object
      properties:
        amount:
          type: number
          example: 27.18
          description: Amount of the token transferred
        symbol:
          type: string
          example: USDC
          description: Token denomination being transferred
        usd:
          type: number
          example: 27.24
          description: USD equivalent of the amount transferred
        icon_url:
          type: string
          example: https://example.com/usdc.png
          description: URL to the token symbol
      required:
        - amount
        - symbol
  securitySchemes:
    Authorization:
      type: http
      scheme: bearer
      bearerFormat: API Key
      description: 'Use Authorization: Bearer <api-key>'

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.range.org/llms.txt

> Returns the **risk score** for a specific blockchain address based on advanced network proximity analysis, machine learning, and behavioral pattern recognition—representing the industry's most comprehensive approach to blockchain threat detection.


# Get Address Risk Score

#### Methodology

Our risk assessment leverages peer-reviewed research establishing that legitimate and malicious blockchain activity exhibit distinguishable network patterns. The approach is grounded in three empirically-validated behavioral characteristics: (1) malicious actors demonstrate clustering behavior through coordinated operations, shared infrastructure, or interconnected money laundering chains; (2) direct transactional relationships with malicious addresses correlate with elevated risk profiles; and (3) legitimate users maintain significantly shorter network distances to regulated cryptocurrency exchanges.

Empirical analysis of the Ethereum blockchain substantiates these patterns: 56% of high-value USDC wallets maintain direct links to regulated exchanges, while 83% of confirmed exploiter addresses operate at greater distances from these entities ([Liao et al., 2025](https://arxiv.org/pdf/2505.24284)).

Our proprietary machine learning models augment this proximity analysis by extracting behavioral signatures from verified malicious addresses, enabling identification of previously undetected threats and substantially expanding coverage of malicious actors beyond conventional threat intelligence sources.

#### Enhanced Capabilities

We're soon releasing enhanced capabilities that solve the core limitations of traditional risk scoring: inability to detect novel threats, excessive false positives on legitimate services, and lack of transaction context. Our multi-layered approach combines machine learning, intelligent entity recognition, and context-aware analysis to provide more accurate, actionable risk intelligence.

***

## Query Parameters

| Name    | Type   | Required | Description                                                            |
| ------- | ------ | -------- | ---------------------------------------------------------------------- |
| address | string | ✅        | The blockchain address to assess.                                      |
| network | string | ✅        | Canonical network identifier. The value must match the address format. |

### Supported Networks

The following networks are fully supported:

* `solana` - Solana
* `celestia` - Celestia
* `osmosis-1` - Osmosis
* `dydx-mainnet-1` - dYdX
* `cosmoshub-4` - Cosmos Hub
* `neutron-1` - Neutron
* `union-testnet-9` - Union Testnet
* `dymension_1100-1` - Dymension
* `agoric-3` - Agoric
* `mantra-1` - MANTRA
* `stride-1` - Stride
* `pio-mainnet-1` - Provenance
* `mantra-dukong-1` - MANTRA Dukong
* `noble-1` - Noble
* `zig-test-1` - Zig Test
* `union-1` - Union
* `stellar` - Stellar

#### Partial Network Support

Other networks may be partially supported and can yield results in two scenarios:

1. **Direct Attribution**: When we have direct attribution data for an address on that network (e.g., a known malicious contract address)
2. **Cross-Chain Propagation**: When malicious activity propagates through inter-chain bridges or cross-chain transactions (e.g., a malicious Solana address that sends assets cross-chain)

> **Note:** The network identifier must exactly match the format of the address being assessed. For optimal results, use one of the fully supported networks listed above.

***

## Response Schema

A successful request returns a JSON object with the following structure:

```json  theme={null}
{
  "riskScore": 10,
  "riskLevel": "CRITICAL RISK (Directly malicious)",
  "numHops": 0,
  "maliciousAddressesFound": [
    {
      "address": "AuZrspySopxfZUiXY6YxDyfS211KvXLe197kj3M2cLpq",
      "distance": 0,
      "name_tag": "Layering, Swapping",
      "entity": null,
      "category": "hack_funds"
    }
  ],
  "reasoning": "Address is directly flagged for malicious activity.",
  "attribution": null
}
```

### Field Definitions

* **`riskScore`** (number, 1–10) – A numerical value where higher scores indicate greater risk. The score reflects whether the address itself is malicious, or how close and well-connected it is to one or more malicious addresses.

* **`riskLevel`** (string) – A human‑readable description of the risk, aligned to the `riskScore`.

* **`numHops`** (integer ≥ 0) – The minimum number of token‑transfer steps connecting the input address to any known malicious address. A value of `0` means the address itself is malicious; `1` means it has directly transacted with a malicious address; `2` means there's one intermediary address between it and a malicious address; and so on. Higher values indicate greater separation from threats and typically result in lower risk scores.

* **`maliciousAddressesFound`** (array) – Evidence used in scoring. List of the malicious addresses that the address to assess is connected to. Each object contains:

  * `address` (string) – A malicious or ML-flagged address encountered on the path.
  * `distance` (integer ≥ 0) – Number of hops from the input address to this malicious address.
  * `name_tag` (string | null) – A human‑readable label describing activity.
  * `entity` (string | null) – Known organization or cluster controlling the malicious address.
  * `category` (string) – Type of malicious activity.

  **Note**: When fields like `name_tag`, `entity`, or `category` are blank or null, this indicates one of two scenarios: (1) the data comes from confidential intelligence sources where specific attribution details cannot be disclosed, or (2) the address was identified through our machine learning models and lacks traditional attribution data. In both cases, we can confirm the address presents potential risk, but detailed attribution may be limited.

* **`reasoning`** (string) – Plain‑English explanation of why the score was assigned. This may include information about direct malicious activity, proximity to malicious addresses, or other insights.

* **`attribution`** (object | null) – Attribution metadata for known non-malicious addresses (e.g., system programs, well-known protocols). When present, indicates the address is a verified non-malicious entity, which may override proximity-based risk scoring. Contains:
  * `name_tag` (string) – Human-readable name (e.g., "Token Program")
  * `entity` (string) – Organization or protocol (e.g., "Solana")
  * `category` (string) – Classification type (e.g., "SYSTEM")
  * `address_role` (string) – Functional role (e.g., "Program")

***

## Risk Scoring Logic

The risk score is computed using a combination of:

1. **Attribution override** – Known non-malicious addresses (system programs, verified protocols) receive the minimum risk score regardless of proximity to malicious addresses.
2. **Direct maliciousness** – If the address is itself flagged, it receives the maximum score.
3. **Hop distance** – The shortest path (`numHops`) to any malicious address. Fewer hops imply higher risk.
4. **Hits** – The total number of malicious addresses found on the shortest and near‑shortest paths.

The table below maps score ranges to risk levels and typical situations:

| riskScore | riskLevel                          | Typical situation                                  |
| --------: | ---------------------------------- | -------------------------------------------------- |
|    **10** | CRITICAL RISK (directly malicious) | Address itself is flagged (0 hops)                 |
|   **9–8** | Extremely high risk                | 1 hop from malicious; ≥ 3 hits ⇒ 9, otherwise 8    |
|   **7–6** | High risk                          | 2 hops; ≥ 3 hits ⇒ 7, otherwise 6                  |
|   **5–4** | Medium risk                        | 3 hops; ≥ 3 hits ⇒ 5, otherwise 4                  |
|   **3–2** | Low risk                           | 4 hops; ≥ 3 hits ⇒ 3, otherwise 2                  |
|     **1** | Very low risk                      | ≥ 5 hops OR known attributed non-malicious address |

Where "hits" refers to the number of malicious addresses found along the relevant paths.

**Note**: Addresses identified as known non-malicious entities (system programs, verified protocols) receive a risk score of 1 regardless of graph proximity to malicious addresses. This attribution override prevents false positives for legitimate infrastructure that naturally has high transaction volumes and diverse counterparties.

**Search Limitations**: Risk analysis examines paths up to 5 hops from the input address. Addresses with no connections to malicious entities within this range receive the lowest risk score (1).

***

## Data Sources & Machine Learning

The risk score leverages multiple data sources: confirmed malicious addresses from threat intelligence, high-probability malicious addresses identified through machine learning, and verified non-malicious addresses (system programs, protocols, exchanges). This multi-faceted approach creates a comprehensive attribution dataset that significantly expands coverage beyond traditional threat intelligence while reducing false positives.

### Data Attribution

Our attribution dataset provides off-chain information (`name_tag`, `category`, `entity`, `address_role`, malicious status) from multiple sources including internal research, community reports, government sanctions lists, partnerships with security companies, and other public/private sources.

**Attribution Override**: Known non-malicious addresses (system programs like Token Program, verified protocols, major exchanges) are identified in our attribution database. When an address is confirmed as a non-malicious entity, the risk score is automatically overridden to the minimum value (1, "Very low risk"), regardless of graph proximity to malicious addresses. This prevents false positives where legitimate system infrastructure appears risky due to high transaction volumes with diverse counterparties. The `attribution` field in the response provides transparency about this override.

### Machine Learning Enhancement

Our ML algorithms enhance traditional address matching by learning behavioral patterns from known malicious addresses. The process involves:

1. **Behavioral Fingerprinting**: Analyzing transaction history to generate 100+ address-level features that capture payment patterns, timing behaviors, and counterparty interactions.
2. **Pattern Recognition**: Training classifiers to recognize behavioral patterns that distinguish malicious actors from legitimate users
3. **Ensemble Classification**: Combining multiple ML models to improve accuracy in identifying potentially malicious addresses.

This approach helps us identify addresses that exhibit malicious behavior patterns but haven't yet been tagged through traditional sources. Addresses flagged as potentially malicious by our ML models are treated in the same way as the foundational attribution dataset in this service.

***

## Examples

### High‑risk (score = 10)

```bash  theme={null}
curl -G https://api.range.org/v1/risk/address \
  --data-urlencode "address=AuZrspySopxfZUiXY6YxDyfS211KvXLe197kj3M2cLpq" \
  --data-urlencode "network=solana" \
  -H "Authorization: Bearer your_api_key_here"
```

Response:

```json  theme={null}
{
  "riskScore": 10,
  "riskLevel": "CRITICAL RISK (Directly malicious)",
  "numHops": 0,
  "maliciousAddressesFound": [
    {
      "address": "AuZrspySopxfZUiXY6YxDyfS211KvXLe197kj3M2cLpq",
      "distance": 0,
      "name_tag": "Layering, Swapping",
      "entity": null,
      "category": "hack_funds"
    }
  ],
  "reasoning": "Address is directly flagged for malicious activity."
}
```

### Low‑risk Solana Address

```bash  theme={null}
curl --location 'https://api.range.org/v1/risk/address?address=2oP36hojo3spVLvrhqNVW8ERUEYMKFAS2XVAmFv289WJ&network=solana' \
  --header 'Authorization: Bearer your_api_key_here"'
```

Response:

```json  theme={null}
{
  "riskScore": 1,
  "riskLevel": "Very low risk",
  "numHops": 5,
  "maliciousAddressesFound": [],
  "reasoning": "No suspicious paths found within 5 hops."
}
```

### Solana Token Program (System Address)

```bash  theme={null}
curl --location 'https://api.range.org/v1/risk/address?address=TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA&network=solana' \
  --header 'Authorization: Bearer your_api_key_here"'
```

Response:

```json  theme={null}
{
  "riskScore": 1,
  "riskLevel": "Very low risk",
  "numHops": 2,
  "maliciousAddressesFound": [
    {
      "address": "CPMMoo8L3F4NbTegBCKVNunggL7H1ZpdTHKxQB5qKP1C",
      "distance": 2,
      "name_tag": "",
      "entity": "",
      "category": ""
    }
  ],
  "reasoning": "Despite being 2 hop(s) from malicious addresses, this is a known system address (Token Program - Solana). Risk overridden to very low.",
  "attribution": {
    "name_tag": "Token Program",
    "entity": "Solana",
    "category": "SYSTEM",
    "address_role": "Program"
  }
}
```

### Celestia Network Example

```bash  theme={null}
curl --location 'https://api.range.org/v1/risk/address?address=DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263&network=celestia' \
  --header 'Authorization: Bearer your_api_key_here"'
```

Response:

```json  theme={null}
{
  "riskScore": 1,
  "riskLevel": "Very low risk",
  "numHops": 5,
  "maliciousAddressesFound": [],
  "reasoning": "No malicious addresses found within 5 hops. This Celestia address shows no direct or indirect connections to known threats."
}
```

### Cross-Chain Address Example

This example shows a 0x-prefixed address that may have risk data due to direct attribution or cross-chain activity:

```bash  theme={null}
curl --location 'https://api.range.org/v1/risk/address?address=0x5d87eaeb84c694a12e01c445fca0b1c527613c25&network=eth' \
  --header 'Authorization: Bearer your_api_key_here"'
```

Response:

```json  theme={null}
{
  "riskScore": 3,
  "riskLevel": "Low risk",
  "numHops": 4,
  "maliciousAddressesFound": [
    {
      "address": "0xSuspicious...",
      "distance": 4,
      "name_tag": "Flagged Contract",
      "entity": "",
      "category": "Suspected"
    }
  ],
  "reasoning": "This address is 4 hops away from 1 suspected address, indicating low risk."
}
```

### Another Solana Example

```bash  theme={null}
curl --location 'https://api.range.org/v1/risk/address?address=7AmvTQJAQAseV53Sqbnwxm3MTKKy6chZa1rhT1FqRkfL&network=solana' \
  --header 'Authorization: Bearer your_api_key_here"'
```

***

### TypeScript Types (Suggested)

Developers using TypeScript can define types to model the API responses. The following interfaces mirror the fields returned by this endpoint:

```ts  theme={null}
type RiskLevel =
  | "CRITICAL RISK (Directly malicious)"
  | "Extremely high risk"
  | "High risk"
  | "Medium risk"
  | "Low risk"
  | "Very low risk";

interface MaliciousEvidence {
  address: string;
  distance: number;
  name_tag: string | null;
  entity: string | null;
  category: string;
}

interface Attribution {
  name_tag: string;
  entity: string;
  category: string;
  address_role: string;
}

interface AddressRiskResponse {
  riskScore: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  riskLevel: RiskLevel;
  numHops: number;
  maliciousAddressesFound: MaliciousEvidence[];
  reasoning: string;
  attribution?: Attribution | null;
}
```

These types can help ensure that your client code accurately models the API's structure.

***

## Errors

| HTTP Code | Cause                                    | Example Body                                                  | Recommended Action                                            |
| --------: | ---------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- |
|   **400** | Missing or invalid `address`/`network`   | `{ "error": "BadRequest", "message": "address is required" }` | Validate parameters before requesting.                        |
|   **404** | Address/network not found or unsupported | `{ "error": "NotFound", "message": "network unsupported" }`   | Use a supported `network` value; ensure address correctness.  |
|   **429** | Rate limited                             | `{ "error": "RateLimitExceeded" }`                            | Reduce request rate; follow `Retry-After` header for backoff. |
|   **5xx** | Server error                             | `{ "error": "ServerError" }`                                  | Retry after a delay; contact support if persistent.           |

***

## Notes & Best Practices

* Always provide a `network` value consistent with the address format.
* Interpret `numHops` as the minimum transfer distance; greater distances generally reduce risk.
* Use both `riskScore` and `riskLevel` in your UI, and display `reasoning` as explanatory text.
* When multiple malicious addresses are found, display at least the entry with the smallest `distance`.
* Check the `attribution` field: when present, it indicates a verified non-malicious address with risk override applied.
* The term **hops** is retained from an earlier Neo4j-based implementation but simply refers to token‑transfer steps in a transaction graph.

***

## Use Cases

* Real‑time address screening ahead of payment execution.
* Compliance monitoring (AML/KYC) with proximity plus behavioral heuristics.
* Fraud prevention by detecting address poisoning and suspicious reactivations.
* Security analysis of counterpart interactions within and across chains.


## OpenAPI

````yaml get /v1/risk/address
openapi: 3.0.0
info:
  title: Range Risk API
  description: The Range Risk API for risk assessment of crypto addresses.
  version: '1.0'
  contact: {}
servers:
  - url: https://api.range.org
    description: Range API Server
security:
  - Authorization: []
tags:
  - name: Risk
    description: Get risk information about a crypto address.
  - name: Simulator
    description: Simulate a transaction on a network.
paths:
  /v1/risk/address:
    get:
      tags:
        - Risk
      summary: Get Address Risk Score
      description: Returns the risk score associated with the specified address.
      operationId: getRiskPath
      parameters:
        - name: address
          required: false
          in: query
          description: Address to search
          schema:
            type: string
        - name: network
          required: false
          in: query
          description: >-
            Network ID of the address. Supports multiple networks including
            solana, osmosis-1, dydx-mainnet-1, cosmoshub-4, neutron-1, stellar,
            and others.
          schema:
            default: solana
            example: solana
            type: string
      responses:
        '200':
          description: >-
            Transactions associated with a specific address. This includes both
            incoming and outgoing transactions.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/RiskScore'
components:
  schemas:
    RiskScore:
      type: object
      properties:
        riskScore:
          type: number
          nullable: true
          description: Calculated normalized risk score (higher = riskier)
          example: 8
        riskLevel:
          enum:
            - CRITICAL RISK (Directly malicious)
            - Extremely high risk
            - High risk
            - Medium risk
            - Low risk
            - Very low risk
          type: string
          description: Human readable risk level classification
        numHops:
          type: number
          nullable: true
          description: Minimum number of hops to the closest malicious address
        maliciousAddressesFound:
          description: List of malicious or related addresses discovered in the path
          type: array
          items:
            $ref: '#/components/schemas/MaliciousMetadata'
        reasoning:
          type: string
          description: Explanation of why the risk level/score was assigned
        attribution:
          description: Attribution information for known non-malicious addresses
          nullable: true
          allOf:
            - $ref: '#/components/schemas/Attribution'
      required:
        - riskScore
        - riskLevel
        - numHops
        - maliciousAddressesFound
        - reasoning
    MaliciousMetadata:
      type: object
      properties:
        address:
          type: string
          description: On-chain address flagged as malicious or related
        distance:
          type: number
          description: Distance in hops from the queried address (0 = directly malicious)
        name_tag:
          type: string
          description: Known name tag or label for the address
          nullable: true
        entity:
          type: string
          description: Entity or organization associated with the address
          nullable: true
        category:
          type: string
          description: Category of malicious behavior (e.g. scam, exploit, mixer)
          nullable: true
      required:
        - address
        - distance
        - name_tag
        - entity
        - category
    Attribution:
      type: object
      properties:
        name_tag:
          type: string
          description: Name or label for the attributed address
          example: Token Program
        entity:
          type: string
          description: Entity or organization associated with the address
          example: Solana
        category:
          type: string
          description: Category of the attributed address
          example: SYSTEM
        address_role:
          type: string
          description: Role or function of the address
          example: Program
      required:
        - name_tag
        - entity
        - category
        - address_role
  securitySchemes:
    Authorization:
      type: http
      scheme: bearer
      bearerFormat: API Key
      description: 'Use Authorization: Bearer <api-key>'

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.range.org/llms.txt

# Token Risk Assessment (Solana)

> Comprehensive risk assessment for Solana tokens using advanced heuristic analysis.

The Token Risk Assessment API evaluates up to 17 independent risk factors across multiple categories to identify potential threats, vulnerabilities, and suspicious attributes in Solana tokens. This analysis helps users make informed decisions about token interactions, investments, and compliance requirements.

***

## 🎯 Key Features

• **Multi-Factor Analysis**: Evaluates up to 17 distinct risk factors when data is available
• **Real-Time Assessment**: Fast analysis with typical response times under 500ms
• **Robust Error Handling**: Continues analysis even when some data sources are unavailable
• **Detailed Explanations**: Human-readable explanations for each risk factor assessment
• **Threshold Transparency**: Clear risk thresholds with configurable parameters available on request

***

## 📊 Risk Assessment Framework

The API analyzes **up to 17 risk factors** across 5 core categories. Note that not all risk factors may be assessed for every token due to data availability from internal sources and calculations.

### 🔑 **Authority & Control (3 factors)**

**1. Circulating Supply Ratio**

* **Purpose**: Detects token dilution risk from centralized mint authority control
* **Data Used**: `circSupply` vs `totalSupply` fields, `audit.mintAuthorityDisabled` flag
* **Calculation**: `circulating_supply / total_supply` ratio analysis
* **Risk Logic**: Low circulating ratios indicate active mint authority usage, creating severe dilution potential
* **Thresholds**: HIGH \< 80%, MEDIUM 80-95%, LOW >95%
* **Why This Matters**: Mint authorities can create unlimited new tokens, severely diluting existing holders without warning

**2. Freeze Authority**

* **Purpose**: Identifies trading restriction risk through account freezing capabilities
* **Data Used**: `freezeAuthority` field, `audit.freezeAuthorityDisabled` flag
* **Calculation**: Boolean presence check with audit override logic
* **Risk Logic**: Freeze authority allows token accounts to be frozen, preventing trading
* **Thresholds**: HIGH (present), LOW (absent or disabled)
* **Why This Matters**: Account freezing can trap user funds and prevent trading indefinitely

**3. Mint Authority**

* **Purpose**: Assesses supply inflation risk from token creation capabilities
* **Data Used**: `mintAuthority` field, `audit.mintAuthorityDisabled` flag
* **Calculation**: Boolean presence check with audit override logic
* **Risk Logic**: Active mint authority enables unlimited token creation
* **Thresholds**: HIGH (present), LOW (absent or disabled)
* **Why This Matters**: New token minting can instantly devalue existing holdings through inflation

### 💰 **Market Structure (5 factors)**

**4. Market Capitalization**

* **Purpose**: Evaluates manipulation susceptibility through market size analysis
* **Data Used**: `mcap` (market capitalization) field
* **Calculation**: Direct USD market cap comparison against thresholds
* **Risk Logic**: Smaller market caps are more susceptible to price manipulation
* **Thresholds**: HIGH \< $1M, MEDIUM $1M-$100M, LOW >$100M
* **Why This Matters**: Low market cap tokens require less capital to manipulate prices significantly

**5. Token Verification**

* **Purpose**: Identifies due diligence gaps increasing scam exposure
* **Data Used**: `isVerified` boolean field
* **Calculation**: Direct boolean evaluation
* **Risk Logic**: Unverified tokens lack institutional due diligence validation
* **Thresholds**: HIGH (unverified), LOW (verified)
* **Why This Matters**: Verification processes help filter out fraudulent or high-risk projects

**6. Liquidity**

* **Purpose**: Assesses exit execution difficulty and holder trapping risk
* **Data Used**: `liquidity` USD value field
* **Calculation**: Direct USD liquidity comparison against thresholds
* **Risk Logic**: Low liquidity creates difficulty executing large trades
* **Thresholds**: HIGH \< $10K, MEDIUM $10K-$100K, LOW >$100K
* **Why This Matters**: Insufficient liquidity can trap holders unable to exit positions

**7. Holder Count**

* **Purpose**: Measures ownership distribution and manipulation resistance
* **Data Used**: `holderCount` field
* **Calculation**: Direct holder count comparison against thresholds
* **Risk Logic**: Few holders indicate high concentration and easier market control
* **Thresholds**: HIGH \< 100, MEDIUM 100-1000, LOW >1000
* **Why This Matters**: Concentrated ownership enables coordinated price manipulation

**8. Top Holder Concentration**

* **Purpose**: Detects extreme concentration enabling coordinated dump attacks
* **Data Used**: `audit.topHoldersPercentage` field
* **Calculation**: Percentage of total supply held by top holders
* **Risk Logic**: High concentration by top holders enables catastrophic coordinated selling
* **Thresholds**: HIGH >90%, MEDIUM 80-90%, LOW \< 80%
* **Why This Matters**: Large holders can cause devastating price crashes through coordinated selling

### 📈 **Trading Patterns (3 factors)**

**9. Price Volatility**

* **Purpose**: Identifies market instability or manipulation through price swing analysis
* **Data Used**: `priceChange` from `stats5m`, `stats1h`, `stats6h`, `stats24h` fields
* **Calculation**: Maximum absolute price change across all timeframes
* **Risk Logic**: Extreme price swings suggest instability or active manipulation
* **Thresholds**: HIGH >50%, MEDIUM 20-50%, LOW \< 20%
* **Why This Matters**: High volatility indicates unstable markets or potential manipulation

**10. Wash Trading**

* **Purpose**: Detects artificial trading activity creating false liquidity impressions
* **Data Used**: `buyVolume` and `sellVolume` from `stats1h`, `stats6h`, `stats24h` fields
* **Calculation**: Buy/sell volume balance analysis across timeframes
* **Risk Logic**: Suspiciously balanced buy/sell volumes indicate artificial trading
* **Thresholds**: HIGH (suspicious in ≥2 timeframes), LOW (normal patterns)
* **Why This Matters**: Wash trading creates false impressions of trading activity and demand

**11. Organic Activity**

* **Purpose**: Evaluates authentic demand vs bot-driven trading activity
* **Data Used**: `organicScoreLabel` field
* **Calculation**: Direct label evaluation (high/medium/low)
* **Risk Logic**: Low organic scores suggest bot-driven rather than genuine trading
* **Thresholds**: HIGH (low organic), MEDIUM (medium organic), LOW (high organic)
* **Why This Matters**: Bot-driven trading indicates lack of genuine user interest and adoption

### 🚀 **Platform & Social (4 factors)**

**12. Developer Migrations**

* **Purpose**: Assesses project stability through team migration history
* **Data Used**: `audit.devMigrations` field
* **Calculation**: Count of developer team migrations
* **Risk Logic**: Frequent migrations indicate team instability and abandonment risk
* **Thresholds**: HIGH ≥5, MEDIUM 2-4, LOW \< 2
* **Why This Matters**: Team instability often precedes project abandonment

**13. Exchange Listings**

* **Purpose**: Validates legitimacy through institutional due diligence requirements
* **Data Used**: `cexes` (centralized exchanges) array field
* **Calculation**: Count and quality of exchange listings
* **Risk Logic**: Major exchanges require due diligence, providing legitimacy validation
* **Thresholds**: HIGH (no listings), MEDIUM (\< 3 or no major), LOW (major exchanges)
* **Why This Matters**: Exchange listings indicate institutional validation and due diligence

**14. Launchpad Platform**

* **Purpose**: Identifies platform reputation risk through historical correlation analysis
* **Data Used**: `launchpad`, `platform` fields, mint address patterns
* **Calculation**: Platform identification and risk correlation lookup
* **Risk Logic**: Some platforms have higher historical rates of fraudulent launches
* **Thresholds**: HIGH (high-risk platforms like pump.fun), LOW (other platforms)
* **Why This Matters**: Platform choice correlates with project quality and fraud rates

**15. Social Media Presence**

* **Purpose**: Evaluates team transparency and accountability mechanisms
* **Data Used**: `twitter`, `telegram`, `website` fields
* **Calculation**: Boolean presence check across social platforms
* **Risk Logic**: Social presence provides transparency and accountability channels
* **Thresholds**: HIGH (no presence), LOW (active presence)
* **Why This Matters**: Team transparency enables accountability and reduces exit scam risk

### ⏰ **Temporal (2 factors)**

**16. Token Age**

* **Purpose**: Assesses maturity and operational track record
* **Data Used**: `firstPool.createdAt` timestamp field
* **Calculation**: Days since first liquidity pool creation
* **Risk Logic**: New tokens lack operational history and higher experimental risk
* **Thresholds**: HIGH \< 7 days, MEDIUM 7-30 days, LOW > 30 days
* **Why This Matters**: Time provides validation of project sustainability and reduces rug pull risk

**17. Graduation Status**

* **Purpose**: Evaluates transition volatility in recently promoted tokens
* **Data Used**: `graduatedAt` timestamp field
* **Calculation**: Days since launchpad graduation
* **Risk Logic**: Recent graduations often create volatility during market transitions
* **Thresholds**: MEDIUM \< 7 days, LOW >7 days or N/A
* **Why This Matters**: Graduation transitions can create price volatility and instability

***

## 🔢 Risk Scoring System

### Scoring Methodology

* **Factor Scoring**: LOW = 0 points, MEDIUM = 1 point, HIGH = 2 points
* **Total Score**: Sum of all assessed factor scores (maximum 34 points for 17 factors)
* **Risk Percentage**: `(total_score / max_possible_score) × 100`

### Overall Risk Classification

* 🔴 **HIGH RISK**: ≥60% of maximum possible score
* 🟡 **MEDIUM RISK**: ≥30% but \< 60% of maximum possible score
* 🟢 **LOW RISK**: \< 30% of maximum possible score

### Custom Thresholds

Current thresholds are calibrated for optimal risk detection. Custom threshold injection is available for enterprise clients—contact [info@range.org](mailto:info@range.org) to request this feature.

***

## 📡 Data Sources & Availability

Token data is sourced from **internal data aggregation and calculations** combining multiple blockchain data providers. The service analyzes available data fields dynamically:

**Available Data Fields**: `circSupply`, `totalSupply`, `freezeAuthority`, `mintAuthority`, `mcap`, `isVerified`, `liquidity`, `holderCount`, `audit.topHoldersPercentage`, `stats*`, `organicScoreLabel`, `cexes`, `launchpad`, `twitter`, `telegram`, `website`, `firstPool.createdAt`, `graduatedAt`

**Data Availability**: Not all data fields are available for every token. The API gracefully handles missing data by:

* Skipping unavailable risk factors
* Including detailed error messages explaining missing assessments
* Continuing analysis with available data
* Providing partial results with warnings when appropriate

***

## ⚡ Response Format

### Low-Risk Token Example (USDC)

```json  theme={null}
{
  "token_info": {
    "mint_address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    "name": "USD Coin",
    "symbol": "USDC"
  },
  "overall_assessment": {
    "risk_level": "LOW",
    "risk_score": 6,
    "max_score": 26,
    "risk_percentage": 23.1
  },
  "summary": {
    "total_factors": 13,
    "high_risk_count": 3,
    "medium_risk_count": 0,
    "low_risk_count": 10
  },
  "risk_factors": {
    "circulating_ratio": {
      "level": "LOW",
      "explanation": ">95% circulating - minimal mint authority usage"
    },
    "freeze_authority": {
      "level": "HIGH",
      "explanation": "Freeze authority present - token accounts can be frozen by authority"
    },
    "minting_authority": {
      "level": "HIGH",
      "explanation": "Mint authority present - new tokens can be created, diluting existing holders"
    },
    "market_cap": {
      "level": "LOW",
      "explanation": "Market cap >$100,000,000 - established project"
    },
    "token_verification": {
      "level": "LOW",
      "explanation": "Token verified - passed institutional due diligence"
    }
  },
  "processing_time_ms": 378.2,
  "errors": [
    "Dev migration data not available - dev_migrations assessment skipped",
    "Exchange listing data not available - exchange_listings assessment skipped"
  ]
}
```

### Medium-Risk Token Example (Limited Data)

```json  theme={null}
{
  "token_info": {
    "mint_address": "5aaHbSR47rtH7m7pV5FEyoqkvGjGRE1xv3kzEjVw4YBx",
    "name": "DEAD LAND SURVIVAL",
    "symbol": "$DEADLAND"
  },
  "overall_assessment": {
    "risk_level": "MEDIUM",
    "risk_score": 2,
    "max_score": 6,
    "risk_percentage": 33.3
  },
  "summary": {
    "total_factors": 3,
    "high_risk_count": 1,
    "medium_risk_count": 0,
    "low_risk_count": 2
  },
  "risk_factors": {
    "freeze_authority": {
      "level": "LOW",
      "explanation": "No freeze authority - accounts cannot be frozen"
    },
    "minting_authority": {
      "level": "LOW",
      "explanation": "No mint authority - token supply is fixed"
    },
    "organic_activity": {
      "level": "HIGH",
      "explanation": "Low organic score - indicates bot-driven trading activity"
    }
  },
  "processing_time_ms": 403.6,
  "errors": [
    "Circulating supply data not available - circulating_ratio assessment skipped",
    "Market cap data not available - market_cap assessment skipped",
    "Token verification data not available - token_verification assessment skipped",
    "Liquidity data not available - liquidity assessment skipped"
  ]
}
```

***

## 🚨 API Endpoint

### Request

```
GET /api/v1/ml/risk/assessment/token
```

### Parameters

| Parameter      | Type   | Required | Description                                                                   |
| -------------- | ------ | -------- | ----------------------------------------------------------------------------- |
| `mint_address` | string | Yes      | Solana token mint address (32-44 character base58 string)                     |
| `network`      | string | No       | Blockchain network (default: "solana") - currently only 'solana' is supported |

### Headers

```
Authorization: Bearer your-api-key
Content-Type: application/json
```

### Response Structure

#### Success Response (200)

```json  theme={null}
{
  "token_info": {
    "mint_address": "string",
    "name": "string",
    "symbol": "string"
  },
  "overall_assessment": {
    "risk_level": "LOW|MEDIUM|HIGH",
    "risk_score": "number",
    "max_score": "number",
    "risk_percentage": "number"
  },
  "summary": {
    "total_factors": "number",
    "high_risk_count": "number",
    "medium_risk_count": "number",
    "low_risk_count": "number"
  },
  "risk_factors": {
    "factor_name": {
      "level": "LOW|MEDIUM|HIGH",
      "explanation": "string"
    }
  },
  "processing_time_ms": "number",
  "errors": ["string"]
}
```

#### Error Response (400/500)

```json  theme={null}
{
  "error": "string",
  "error_type": "string",
  "detail": "string",
  "mint_address": "string"
}
```

***

## 🔧 Error Handling Examples

### Invalid Address Format

```json  theme={null}
{
  "detail": [
    {
      "type": "string_pattern_mismatch",
      "loc": ["query", "mint_address"],
      "msg": "String should match pattern '^[1-9A-HJ-NP-Za-km-z]{32,44}$'",
      "input": "invalid_address",
      "ctx": {
        "pattern": "^[1-9A-HJ-NP-Za-km-z]{32,44}$"
      }
    }
  ]
}
```

### Network Error

```json  theme={null}
{
  "error": "Unsupported network",
  "error_type": "validation_error",
  "detail": "Only 'solana' network is supported",
  "mint_address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
}
```

### Response Features

* **Graceful Degradation**: Returns partial results when some risk factors cannot be assessed
* **Detailed Error Messages**: Specific explanations for each failed assessment in the `errors` array
* **Transparent Processing**: Non-fatal errors included in response for troubleshooting
* **Consistent Structure**: All successful responses follow the same JSON schema

***

## 🔄 Service Evolution

This is a constantly evolving service with continuous improvements:

* **New Risk Factors**: Additional risk factors are regularly researched and implemented
* **Enhanced Detection**: Machine learning integration and advanced pattern recognition
* **Threshold Optimization**: Regular calibration based on market conditions and feedback
* **Data Source Expansion**: Integration with additional data providers for better coverage

***

## 💡 Use Cases

### Compliance & Risk Management

* Screen tokens before integration into DeFi protocols
* Assess compliance risk for regulatory requirements
* Evaluate tokens for institutional investment policies

### DeFi & Trading Applications

* Pre-trade risk assessment for automated strategies
* Portfolio risk monitoring and rebalancing
* User protection in DeFi applications

### Security & Due Diligence

* Token vetting for exchange listings
* Investment research and due diligence
* Fraud prevention and scam detection

***

## 📝 Example Requests & Responses

### Stablecoin Assessment (Low Risk)

**Request:**

```bash  theme={null}
curl -X GET "https://api.range.org/api/v1/ml/risk/assessment/token?mint_address=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&network=solana" \
  -H "Authorization: Bearer your-api-key"
```

**Key Insights:** USDC shows LOW overall risk (23.1%) despite having freeze/mint authorities, demonstrating how multiple factors contribute to the final assessment. The token benefits from high market cap, verification status, and strong liquidity.

### Utility Token Assessment

**Request:**

```bash  theme={null}
curl -X GET "https://api.range.org/api/v1/ml/risk/assessment/token?mint_address=JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN&network=solana" \
  -H "Authorization: Bearer your-api-key"
```

### Additional Test Tokens

#### Popular Stablecoins:

* **USDT**: `Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB`
* **Wrapped SOL**: `So11111111111111111111111111111111111111112`

#### Established Meme Tokens:

* **BONK**: `DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263`
* **WIF**: `EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm`
* **POPCAT**: `7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr`

#### DeFi & Infrastructure:

* **Pyth Network**: `HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3`
* **Marinade SOL**: `mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So`
* **JitoSOL**: `J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn`

### Meme Token Assessment

**Request:**

```bash  theme={null}
curl -X GET "https://api.range.org/api/v1/ml/risk/assessment/token?mint_address=2qEHjDLDLbuBgRYvsxhc5D6uDWAivNFZGan56P1tpump&network=solana" \
  -H "Authorization: Bearer your-api-key"
```

**Key Insights:** PNUT (Peanut the Squirrel) shows LOW overall risk (9.4%) with only launchpad risk flagged as HIGH due to pump.fun origin, demonstrating that established meme tokens can achieve good risk profiles over time.

### Limited Data Token Assessment

**Request:**

```bash  theme={null}
curl -X GET "https://api.range.org/api/v1/ml/risk/assessment/token?mint_address=5aaHbSR47rtH7m7pV5FEyoqkvGjGRE1xv3kzEjVw4YBx&network=solana" \
  -H "Authorization: Bearer your-api-key"
```

**Key Insights:** Tokens with limited data availability result in MEDIUM risk classification (33.3%) with extensive error reporting, demonstrating the API's graceful degradation capabilities.

***

## 🌐 Network Support

**Currently Supported:**

* ✅ **Solana** - Full risk assessment with 17+ risk factors

**Future Network Support:**
We are actively working to expand network support. Planned additions include:

* 🔄 **Ethereum** - ERC-20 token risk assessment (in development)
* 🔄 **Base** - Layer 2 token analysis (roadmap)
* 🔄 **Arbitrum** - Rollup token evaluation (roadmap)
* 🔄 **Polygon** - Multi-chain compatibility (roadmap)

*Contact [info@range.org](mailto:info@range.org) to request priority support for specific networks or to discuss enterprise multi-chain requirements.*

***

## 📞 Support & Contact

For technical support, enterprise features, or custom threshold configurations:

* **Email**: [info@range.org](mailto:info@range.org)
* **Documentation**: This reference guide
* **Response Time**: Typically under 500ms for standard requests

***

## 📊 Risk Factor Summary Table

| Factor                   | Category            | Data Source                     | HIGH Risk            | MEDIUM Risk   | LOW Risk        |
| ------------------------ | ------------------- | ------------------------------- | -------------------- | ------------- | --------------- |
| Circulating Supply Ratio | Authority & Control | `circSupply`/`totalSupply`      | \< 80%               | 80-95%        | >95%            |
| Freeze Authority         | Authority & Control | `freezeAuthority`               | Present              | -             | Absent/Disabled |
| Mint Authority           | Authority & Control | `mintAuthority`                 | Present              | -             | Absent/Disabled |
| Market Capitalization    | Market Structure    | `mcap`                          | \< \$1M              | $1M-$100M     | >\$100M         |
| Token Verification       | Market Structure    | `isVerified`                    | Unverified           | -             | Verified        |
| Liquidity                | Market Structure    | `liquidity`                     | \< \$10K             | $10K-$100K    | >\$100K         |
| Holder Count             | Market Structure    | `holderCount`                   | \< 100               | 100-1000      | >1000           |
| Top Holder Concentration | Market Structure    | `audit.topHoldersPercentage`    | >90%                 | 80-90%        | \< 80%          |
| Price Volatility         | Trading Patterns    | `stats*.priceChange`            | >50%                 | 20-50%        | \< 20%          |
| Wash Trading             | Trading Patterns    | `stats*.buyVolume`/`sellVolume` | Suspicious ≥2 TF     | -             | Normal          |
| Organic Activity         | Trading Patterns    | `organicScoreLabel`             | Low                  | Medium        | High            |
| Developer Migrations     | Platform & Social   | `audit.devMigrations`           | ≥5                   | 2-4           | \< 2            |
| Exchange Listings        | Platform & Social   | `cexes`                         | No listings          | \< 3/no major | Major exchanges |
| Launchpad Platform       | Platform & Social   | `launchpad`/patterns            | High-risk (pump.fun) | -             | Other platforms |
| Social Media Presence    | Platform & Social   | `twitter`/`telegram`/`website`  | No presence          | -             | Active presence |
| Token Age                | Temporal            | `firstPool.createdAt`           | \< 7 days            | 7-30 days     | >30 days        |
| Graduation Status        | Temporal            | `graduatedAt`                   | -                    | \< 7 days     | >7 days/N/A     |

***

*This documentation covers the Token Risk Assessment API as of September 2025. Features and thresholds are subject to continuous improvement and calibration.*


## OpenAPI

````yaml get /v1/risk/token
openapi: 3.0.0
info:
  title: Range Risk API
  description: The Range Risk API for risk assessment of crypto addresses.
  version: '1.0'
  contact: {}
servers:
  - url: https://api.range.org
    description: Range API Server
security:
  - Authorization: []
tags:
  - name: Risk
    description: Get risk information about a crypto address.
  - name: Simulator
    description: Simulate a transaction on a network.
paths:
  /v1/risk/token:
    get:
      tags:
        - Risk
      summary: Get Token Risk Assessment
      description: >-
        Returns comprehensive risk assessment for a Solana token using ML
        analysis.
      operationId: getTokenRiskAssessment
      parameters:
        - name: asset_address
          required: true
          in: query
          description: >-
            Asset identifier (chain-agnostic). Currently only Solana token mint
            (base58, 32–44 chars) is supported.
          schema:
            example: So11111111111111111111111111111111111111112
            type: string
        - name: network
          required: true
          in: query
          description: Blockchain network for token risk (only solana supported)
          schema:
            example: solana
            type: string
            enum:
              - solana
      responses:
        '200':
          description: Token risk assessment with detailed factors and scoring
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TokenRiskResponse'
components:
  schemas:
    TokenRiskResponse:
      type: object
      properties:
        token_info:
          description: Basic token identification details
          allOf:
            - $ref: '#/components/schemas/TokenInfo'
        overall_assessment:
          description: Overall risk assessment aggregation
          allOf:
            - $ref: '#/components/schemas/OverallAssessment'
        summary:
          description: Summary counts of risk factor severity levels
          allOf:
            - $ref: '#/components/schemas/Summary'
        risk_factors:
          type: object
          description: Map of risk factor key to its detailed assessment
          additionalProperties:
            oneOf:
              - $ref: '#/components/schemas/RiskFactorDetail'
        processing_time_ms:
          type: number
          description: Processing time in milliseconds for the assessment
          example: 154
        errors:
          description: List of non-fatal errors encountered while computing the assessment
          type: array
          items:
            type: string
      required:
        - token_info
        - overall_assessment
        - summary
        - risk_factors
        - processing_time_ms
        - errors
    TokenInfo:
      type: object
      properties:
        asset_address:
          type: string
          description: >-
            Asset identifier (Solana mint / EVM contract / Cosmos denom).
            Currently Solana mint.
          example: So11111111111111111111111111111111111111112
        name:
          type: string
          description: Token name
          example: Wrapped SOL
        symbol:
          type: string
          description: Ticker symbol
          example: SOL
      required:
        - asset_address
        - name
        - symbol
    OverallAssessment:
      type: object
      properties:
        risk_level:
          enum:
            - LOW
            - MEDIUM
            - HIGH
          type: string
          description: Overall risk level derived from weighted factors
        risk_score:
          type: number
          description: Aggregate risk score for the token
        max_score:
          type: number
          description: Maximum theoretical score used for normalization
        risk_percentage:
          type: number
          description: Percentage representation of the risk score (0-100)
          example: 72.5
      required:
        - risk_level
        - risk_score
        - max_score
        - risk_percentage
    Summary:
      type: object
      properties:
        total_factors:
          type: number
          description: Total number of evaluated risk factors
        high_risk_count:
          type: number
          description: Number of high risk factors
        medium_risk_count:
          type: number
          description: Number of medium risk factors
        low_risk_count:
          type: number
          description: Number of low risk factors
      required:
        - total_factors
        - high_risk_count
        - medium_risk_count
        - low_risk_count
    RiskFactorDetail:
      type: object
      properties:
        level:
          enum:
            - LOW
            - MEDIUM
            - HIGH
          type: string
          description: Risk level classification of this factor
        explanation:
          type: string
          description: Explanation detailing why this factor has its assigned level
      required:
        - level
        - explanation
  securitySchemes:
    Authorization:
      type: http
      scheme: bearer
      bearerFormat: API Key
      description: 'Use Authorization: Bearer <api-key>'

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.range.org/llms.txt

# Get Payment Risk Assessment

> End-to-end risk assessment for payments across and within chains, powered by advanced heuristic rules and machine-learning analysis.


Returns a **comprehensive risk assessment** for blockchain payments by analyzing both sender and recipient addresses using advanced heuristic rules, transaction history analysis, behavioral pattern recognition, and ML-powered malicious connection detection. This endpoint provides real-time risk evaluation for payment flows across multiple blockchain networks.

#### Methodology

Payment risk assessment employs a **multi-layered approach** combining eight independent risk assessments to provide a holistic view of payment safety:

1. **New Wallet Detection** – Identifies recipients with minimal or no transaction history, indicating potentially higher risk
2. **Dormant Wallet Detection** – Flags recipient addresses reactivating after extended periods (>180 days) of inactivity
3. **Address Poisoning Detection** – Analyzes sender's potential poison addresses and checks if recipient matches poisoning patterns
4. **Interaction History Analysis** – Examines previous transaction relationships between sender and recipient addresses
5. **Malicious Connection Analysis** – Leverages Range Security's ML-powered distance-to-malicious endpoint to identify connections to known malicious addresses
6. **Attributed Address Check** – Verifies addresses against known attribution databases (exchanges, protocols, system addresses)
7. **Token Risk Assessment** – When token parameters are provided, evaluates token-specific risk factors for Solana tokens
8. **Cross-Chain Support** – Handles both same-network and cross-chain payment scenarios with appropriate index selection

The **overall risk level** is determined using a **maximum risk approach**: if any individual assessment returns "high", the overall risk is "high"; if the highest is "medium", overall is "medium"; if all are "low", overall is "low".

#### Supported Networks

Full payment data support for: `solana`, `osmosis`, `cosmoshub`, `dydx`, `neutron`, `celestia`, `dymension`, `agoric`, `mantra`, `stride`, `noble`, `union`, `stellar`, and others.

Networks without payment data still benefit from attribution checks and malicious connection analysis, providing limited but valuable risk intelligence.

***

## Query Parameters

| Name               | Type   | Required | Description                                                                 |
| ------------------ | ------ | -------- | --------------------------------------------------------------------------- |
| sender\_address    | string | ✅        | Blockchain address of the sender (minimum 10 characters)                    |
| recipient\_address | string | ✅        | Blockchain address of the recipient (minimum 10 characters)                 |
| amount             | number | ✅        | Payment amount in USD equivalent (must be greater than 0)                   |
| sender\_network    | string | ✅        | Sender's blockchain network (e.g., `solana`, `osmosis`, `ethereum`)         |
| recipient\_network | string | ✅        | Recipient's blockchain network                                              |
| sender\_token      | string | ❌        | Token/denom being sent (optional, enables token risk assessment for Solana) |
| recipient\_token   | string | ❌        | Token/denom being received (optional)                                       |
| timestamp          | string | ❌        | Payment timestamp in ISO 8601 format (e.g., `2025-01-15T10:30:00Z`)         |

**Validation Rules:**

* Sender and recipient addresses must be different
* Amount must be greater than 0
* Address minimum length: 10 characters
* Network minimum length: 3 characters
* Timestamp format: ISO 8601 (if provided)

***

## Response Schema

A successful request returns a JSON object with the following structure:

```json  theme={null}
{
  "overall_risk_level": "high",
  "risk_factors": [
    {
      "factor": "new_wallet_recipient",
      "risk_level": "medium",
      "description": "Recipient is a completely new wallet with no transaction history"
    },
    {
      "factor": "first_interaction",
      "risk_level": "high",
      "description": "First ever interaction between these addresses"
    },
    {
      "factor": "connected_to_malicious_address",
      "risk_level": "high",
      "description": "Sender is 2 hops away from known malicious addresses"
    }
  ],
  "processing_time_ms": 4159.017,
  "errors": [],
  "request_summary": {
    "sender_address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
    "recipient_address": "7UX2i7SucgLMQcfZ75s3VXmZZY4YRUyJN9X1RgfMoDUi",
    "amount": 1000.0,
    "sender_network": "solana",
    "recipient_network": "solana",
    "sender_token": null,
    "recipient_token": null,
    "timestamp": null
  }
}
```

### Field Definitions

* **`overall_risk_level`** (string) – Final risk determination using maximum risk approach. Possible values:

  * `"low"` – Payment appears safe based on all risk factors
  * `"medium"` – Some risk factors detected, proceed with caution
  * `"high"` – Significant risk factors detected, high risk payment
  * `"unknown"` – Unable to assess (unsupported networks with no attribution data)

* **`risk_factors`** (array) – List of individual risk assessments performed. Each factor contains:

  * `factor` (string) – Unique identifier for the risk factor (e.g., `new_wallet_recipient`, `first_interaction`)
  * `risk_level` (string) – Risk level for this specific factor (`"low"`, `"medium"`, `"high"`)
  * `description` (string) – Human-readable explanation of the risk

* **`processing_time_ms`** (number) – Processing time in milliseconds. Typical ranges:

  * Fully supported networks: 1000-3000ms
  * Partially supported: 200-600ms
  * Unsupported networks: 130-500ms

* **`errors`** (array of strings) – List of errors encountered during analysis. Empty array if no errors. May contain informational messages about network support limitations.

* **`request_summary`** (object) – Echo of the original request parameters for verification and logging purposes.

***

## Risk Assessment Details

### Individual Risk Factors

#### 1. New Wallet Detection (Recipient)

**Factor Names:** `new_wallet_recipient`, `established_wallet_recipient`

Analyzes recipient's transaction history to determine if the wallet is newly created or established.

**Risk Levels:**

* **HIGH**: 0 transactions (completely new wallet)
* **MEDIUM**: \< 3 transactions OR first transaction \< 7 days ago
* **LOW**: ≥ 3 transactions AND > 7 days old (established wallet)

**Example Descriptions:**

* `"Recipient is a completely new wallet with no transaction history"`
* `"Recipient has substantial transaction history (500+ transactions over 6 months)"`

***

#### 2. Dormant Wallet Detection (Recipient)

**Factor Names:** `dormant_wallet_recipient`, `active_wallet_recipient`

Checks if recipient has been inactive for an extended period and is now reactivating.

**Risk Levels:**

* **MEDIUM**: Last transaction > 180 days ago (dormant reactivation)
* **LOW**: Recent activity (\< 180 days)

**Example Descriptions:**

* `"Recipient wallet was dormant for 200+ days and is now reactivating"`
* `"Recipient wallet was active within the last 7 days"`

***

#### 3. Address Poisoning Detection (Sender)

**Factor Names:** `address_poisoning_attack`, `no_address_poisoning`

Detects if the recipient address matches poison address patterns associated with the sender.

**Risk Levels:**

* **HIGH**: Recipient matches a poison address pattern (4-char prefix/suffix matching)
* **LOW**: No poisoning pattern detected

**Example Descriptions:**

* `"Potential address poisoning attack detected - recipient matches poison address pattern"`
* `"No address poisoning pattern detected between sender and recipient"`

***

#### 4. Interaction History Analysis (Sender-Recipient Pair)

**Factor Names:** `first_interaction`, `limited_interaction_history`, `established_interaction_history`

Analyzes previous transaction relationships between the sender and recipient addresses.

**Index Selection:**

* Same network: Uses network-specific index (e.g., `payments_solana`)
* Cross-chain: Uses `payments_interchain` index

**Risk Levels:**

* **HIGH**: 0 interactions (first time transacting)
* **MEDIUM**: 1-2 interactions (limited history)
* **LOW**: 3+ interactions (established relationship)

**Example Descriptions:**

* `"First ever interaction between these addresses"`
* `"Limited interaction history: 2 previous interactions found"`
* `"Strong interaction history: 15 previous interactions found"`

***

#### 5. Malicious Connection Analysis (Both)

**Factor Names:**

* Sender: `malicious_connection_sender_direct`, `malicious_connection_sender_high`, `malicious_connection_sender_medium`, `malicious_connection_sender_low`
* Recipient: `malicious_connection_recipient_*` (same pattern)
* Clean: `clean_address_sender`, `clean_address_recipient`

Uses Range Security's ML-powered malicious distance endpoint to identify connections.

**Risk Levels:**

* **HIGH**: 0-2 hops from malicious addresses
* **MEDIUM**: 3 hops from malicious addresses
* **LOW**: 4 hops from malicious addresses OR no connections found

**Example Descriptions:**

* `"Sender is directly connected to known malicious addresses (0 hops)"`
* `"Sender is 2 hops away from known malicious addresses (riskScore: 1)"`
* `"Sender address has no known connections to malicious addresses"`

***

#### 6. Attributed Address Check (Both)

**Factor Names:** `malicious_address_sender`, `malicious_address_recipient`, `attributed_address_sender`, `attributed_address_recipient`, `known_attributed_sender`, `known_attributed_recipient`

Checks addresses against attribution databases for known entities.

**Risk Levels:**

* **HIGH**: Address found with `malicious=True` flag
* **LOW**: Address found with known attribution (exchanges, protocols, system addresses)

**Example Descriptions:**

* `"Address attributed to 'Binance Hot Wallet' (Entity: Binance, Category: Exchange, Role: Hot Wallet)"`
* `"Sender is a known attributed address | identified as 'Token Program' | (entity: Solana) | Category: SYSTEM | Role: Program | ✓ Not flagged as malicious"`

**Note**: This assessment is **network-independent** and runs even for unsupported networks.

***

#### 7 & 8. Token Risk Assessment (Sender/Recipient)

**Factor Names:** `token_risk_sender_low`, `token_risk_sender_medium`, `token_risk_sender_high` (and `_recipient_*` variants)

When `sender_token` or `recipient_token` parameters are provided, evaluates token-specific risk factors.

**Supported Networks:** Currently Solana only

**Risk Levels:** Maps from token risk score to payment risk level (low/medium/high)

**Example Descriptions:**

* `"Sender token EPjFWdd5Au... has low risk (established stablecoin)"`
* `"Recipient token shows medium risk factors"`

***

## Network Support Scenarios

### Fully Supported Networks

Both sender and recipient networks have payment data available.

**Result:** Full risk assessment with all applicable risk factors\
**Processing Time:** \~1000-3000ms\
**Example:** `sender_network=solana, recipient_network=solana`

***

### Partially Supported Networks

One network has payment data, the other doesn't.

**Result:** Limited assessment

* Assessments run for the supported side
* Attribution checks run for both
* Interaction analysis skipped

**Processing Time:** \~200-600ms\
**Errors Array:** Contains limitation messages

***

### Unsupported Networks

Neither network has payment data.

**Result:**

* Returns `overall_risk_level: "unknown"` if no attribution data found
* Attribution check still runs (network-independent)
* Returns actual risk level if malicious addresses found

**Processing Time:** \~130-500ms (fastest, minimal queries)\
**Errors Array:** Contains limitation messages and list of supported networks

***

## Examples

### Example 1: High Risk - First Interaction with New Wallet

```bash  theme={null}
curl -G https://api.range.org/v1/risk/payment \
  --data-urlencode "sender_address=TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA" \
  --data-urlencode "recipient_address=7UX2i7SucgLMQcfZ75s3VXmZZY4YRUyJN9X1RgfMoDUi" \
  --data-urlencode "amount=1000.0" \
  --data-urlencode "sender_network=solana" \
  --data-urlencode "recipient_network=solana"
```

**Response:**

```json  theme={null}
{
  "overall_risk_level": "high",
  "risk_factors": [
    {
      "factor": "new_wallet_recipient",
      "risk_level": "medium",
      "description": "Recipient is a completely new wallet with no transaction history"
    },
    {
      "factor": "first_interaction",
      "risk_level": "high",
      "description": "First ever interaction between these addresses"
    }
  ],
  "processing_time_ms": 2456.78,
  "errors": []
}
```

***

### Example 2: Low Risk - Established Relationship

```bash  theme={null}
curl -G https://api.range.org/v1/risk/payment \
  --data-urlencode "sender_address=DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263" \
  --data-urlencode "recipient_address=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" \
  --data-urlencode "amount=250.0" \
  --data-urlencode "sender_network=solana" \
  --data-urlencode "recipient_network=solana" \
  --data-urlencode "sender_token=So11111111111111111111111111111111111111112" \
  --data-urlencode "timestamp=2025-01-15T10:30:00Z"
```

**Response:**

```json  theme={null}
{
  "overall_risk_level": "low",
  "risk_factors": [
    {
      "factor": "established_wallet_recipient",
      "risk_level": "low",
      "description": "Recipient has substantial transaction history"
    },
    {
      "factor": "established_interaction_history",
      "risk_level": "low",
      "description": "Strong interaction history: 15 previous interactions found"
    }
  ],
  "processing_time_ms": 1876.45
}
```

***

### Example 3: Cross-Chain Payment

```bash  theme={null}
curl -G https://api.range.org/v1/risk/payment \
  --data-urlencode "sender_address=osmo1abc123def456ghi789jkl012mno345pqr678stu" \
  --data-urlencode "recipient_address=cosmos1xyz987uvw654rst321nmo098lkj765ihg432fed" \
  --data-urlencode "amount=5000.0" \
  --data-urlencode "sender_network=osmosis" \
  --data-urlencode "recipient_network=cosmoshub" \
  --data-urlencode "sender_token=OSMO" \
  --data-urlencode "recipient_token=ATOM"
```

**Response:**

```json  theme={null}
{
  "overall_risk_level": "medium",
  "risk_factors": [
    {
      "factor": "first_interaction",
      "risk_level": "high",
      "description": "First cross-chain interaction between these addresses (interchain index)"
    }
  ],
  "processing_time_ms": 3124.78
}
```

***

## Errors

### 400 Bad Request

Invalid request parameters or validation failure.

**Common Causes:**

* Sender and recipient addresses are the same
* Invalid timestamp format
* Amount \< = 0
* Address or network too short

**Example Response:**

```json  theme={null}
{
  "statusCode": 400,
  "message": "Sender and recipient addresses cannot be the same",
  "error": "Bad Request"
}
```

***

### 422 Unprocessable Entity

Validation error in request parameters (FastAPI automatic validation).

***

### 500 Internal Server Error

Unexpected server error during risk assessment.

**Example Response:**

```json  theme={null}
{
  "statusCode": 500,
  "message": "An unexpected error occurred: Connection timeout",
  "error": "Internal Server Error"
}
```

***

## Notes & Best Practices

1. **Maximum Risk Approach**: Overall risk is determined by the highest individual risk factor
2. **Network Validation**: Delegated to ML API - pass through network identifiers as provided
3. **Response Format**: Lowercase risk levels (`"low"`, `"medium"`, `"high"`, `"unknown"`) match ML API format
4. **Error Handling**: Graceful degradation - partial results returned if some assessments fail
5. **Caching**: GET endpoint enables HTTP caching for improved performance
6. **Authentication**: Uses same authentication as other risk endpoints (API key via `Authorization` header)

***

## Use Cases

* **Real-Time Payment Screening**: Risk assessment before payment execution in wallets and exchanges
* **Compliance Monitoring**: AML/KYC risk evaluation for financial institutions
* **Fraud Prevention**: Identify potentially fraudulent payment patterns and address poisoning attacks
* **Security Analysis**: Detect connections to malicious addresses before fund transfers
* **Cross-Chain Risk**: Evaluate risk for cross-chain bridging and swaps

***

## Performance

* **Real-Time**: Designed for sub-3-second processing for fully supported networks
* **Efficient**: GET with query parameters enables CDN/caching for repeated lookups
* **Scalable**: Modular architecture supports future optimizations and parallel assessment execution
* **Network-Dependent**: Processing time varies based on network support level

***

## Related Documents

* **Address Risk Score Endpoint** (`/v1/risk/address`) – Returns risk score for individual addresses
* **Transaction Risk Score Endpoint** (`/v1/risk/transaction`) – Analyzes transaction risk based on involved addresses
* **Token Risk Assessment Endpoint** (`/v1/risk/token`) – Comprehensive Solana token risk analysis
* **Risk API Overview** – General documentation for all risk endpoints and authentication

***

## TypeScript Types (Suggested)

Developers using TypeScript can define types to model the API responses:

```typescript  theme={null}
type PaymentRiskLevel = "low" | "medium" | "high" | "unknown";

interface PaymentRiskFactor {
  factor: string;
  risk_level: PaymentRiskLevel;
  description: string;
}

interface PaymentRequestSummary {
  sender_address: string;
  recipient_address: string;
  amount: number;
  sender_network: string;
  recipient_network: string;
  sender_token: string | null;
  recipient_token: string | null;
  timestamp: string | null;
}

interface PaymentRiskResponse {
  overall_risk_level: PaymentRiskLevel;
  risk_factors: PaymentRiskFactor[];
  processing_time_ms: number;
  errors: string[];
  request_summary: PaymentRequestSummary;
}
```


## OpenAPI

````yaml get /v1/risk/payment
openapi: 3.0.0
info:
  title: Range Risk API
  description: The Range Risk API for risk assessment of crypto addresses.
  version: '1.0'
  contact: {}
servers:
  - url: https://api.range.org
    description: Range API Server
security:
  - Authorization: []
tags:
  - name: Risk
    description: Get risk information about a crypto address.
  - name: Simulator
    description: Simulate a transaction on a network.
paths:
  /v1/risk/payment:
    get:
      tags:
        - Risk
      summary: Get Payment Risk Assessment
      description: >-
        Analyzes cross-chain payments to assess risk using advanced heuristic
        rules and ML-powered analysis. Evaluates sender and recipient addresses
        based on transaction history, behavioral patterns, interaction history,
        address poisoning detection, malicious connections, and security
        indicators.
      operationId: getPaymentRiskAssessment
      parameters:
        - name: sender_address
          required: true
          in: query
          description: Sender blockchain address
          schema:
            example: TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA
            type: string
        - name: recipient_address
          required: true
          in: query
          description: Recipient blockchain address
          schema:
            example: 7UX2i7SucgLMQcfZ75s3VXmZZY4YRUyJN9X1RgfMoDUi
            type: string
        - name: amount
          required: true
          in: query
          description: Payment amount in USD equivalent (must be positive)
          schema:
            minimum: 0.01
            example: 1000
            type: number
        - name: sender_network
          required: true
          in: query
          description: Sender blockchain network (e.g., solana, osmosis, ethereum)
          schema:
            example: solana
            type: string
        - name: recipient_network
          required: true
          in: query
          description: Recipient blockchain network
          schema:
            example: solana
            type: string
        - name: sender_token
          required: false
          in: query
          description: Token/denom being sent (optional, enables token risk assessment)
          schema:
            example: EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
            type: string
        - name: recipient_token
          required: false
          in: query
          description: Token/denom being received (optional)
          schema:
            example: EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
            type: string
        - name: timestamp
          required: false
          in: query
          description: Payment timestamp in ISO 8601 format (optional)
          schema:
            example: '2025-01-15T10:30:00Z'
            type: string
      responses:
        '200':
          description: >-
            Payment risk assessment with individual risk factors and overall
            risk level
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaymentRiskResponse'
components:
  schemas:
    PaymentRiskResponse:
      type: object
      properties:
        overall_risk_level:
          enum:
            - low
            - medium
            - high
            - unknown
          type: string
          description: >-
            Overall risk level determined by maximum risk approach. Possible
            values: low, medium, high, unknown
          example: high
        risk_factors:
          description: List of individual risk assessments performed
          type: array
          items:
            $ref: '#/components/schemas/PaymentRiskFactor'
        processing_time_ms:
          type: number
          description: Processing time in milliseconds
          example: 4159.017
        errors:
          description: List of errors encountered during analysis (empty if no errors)
          type: array
          items:
            type: string
        request_summary:
          description: Echo of the original request parameters for verification
          allOf:
            - $ref: '#/components/schemas/PaymentRequestSummary'
      required:
        - overall_risk_level
        - risk_factors
        - processing_time_ms
        - errors
        - request_summary
    PaymentRiskFactor:
      type: object
      properties:
        risk_context:
          enum:
            - sender
            - recipient
            - interaction
          type: string
          description: >-
            Categorizes whether the risk is related to sender address only,
            recipient address only, or their interaction
          example: recipient
        factor:
          type: string
          description: Unique identifier for the risk factor
          example: new_wallet_recipient
        risk_level:
          enum:
            - low
            - medium
            - high
            - unknown
          type: string
          description: Risk level classification of this factor
          example: medium
        description:
          type: string
          description: Human-readable explanation of the risk factor
          example: Recipient is a new wallet with minimal transaction history
      required:
        - risk_context
        - factor
        - risk_level
        - description
    PaymentRequestSummary:
      type: object
      properties:
        sender_address:
          type: string
          description: Sender blockchain address
          example: TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA
        recipient_address:
          type: string
          description: Recipient blockchain address
          example: 7UX2i7SucgLMQcfZ75s3VXmZZY4YRUyJN9X1RgfMoDUi
        amount:
          type: number
          description: Payment amount in USD equivalent
          example: 1000
        sender_network:
          type: string
          description: Sender blockchain network
          example: solana
        recipient_network:
          type: string
          description: Recipient blockchain network
          example: solana
        sender_token:
          type: string
          nullable: true
          description: Token/denom being sent (optional)
        recipient_token:
          type: string
          nullable: true
          description: Token/denom being received (optional)
        timestamp:
          type: string
          nullable: true
          description: Payment timestamp (optional)
      required:
        - sender_address
        - recipient_address
        - amount
        - sender_network
        - recipient_network
  securitySchemes:
    Authorization:
      type: http
      scheme: bearer
      bearerFormat: API Key
      description: 'Use Authorization: Bearer <api-key>'

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.range.org/llms.txt

# Get Payment Risk Assessment

> End-to-end risk assessment for payments across and within chains, powered by advanced heuristic rules and machine-learning analysis.


Returns a **comprehensive risk assessment** for blockchain payments by analyzing both sender and recipient addresses using advanced heuristic rules, transaction history analysis, behavioral pattern recognition, and ML-powered malicious connection detection. This endpoint provides real-time risk evaluation for payment flows across multiple blockchain networks.

#### Methodology

Payment risk assessment employs a **multi-layered approach** combining eight independent risk assessments to provide a holistic view of payment safety:

1. **New Wallet Detection** – Identifies recipients with minimal or no transaction history, indicating potentially higher risk
2. **Dormant Wallet Detection** – Flags recipient addresses reactivating after extended periods (>180 days) of inactivity
3. **Address Poisoning Detection** – Analyzes sender's potential poison addresses and checks if recipient matches poisoning patterns
4. **Interaction History Analysis** – Examines previous transaction relationships between sender and recipient addresses
5. **Malicious Connection Analysis** – Leverages Range Security's ML-powered distance-to-malicious endpoint to identify connections to known malicious addresses
6. **Attributed Address Check** – Verifies addresses against known attribution databases (exchanges, protocols, system addresses)
7. **Token Risk Assessment** – When token parameters are provided, evaluates token-specific risk factors for Solana tokens
8. **Cross-Chain Support** – Handles both same-network and cross-chain payment scenarios with appropriate index selection

The **overall risk level** is determined using a **maximum risk approach**: if any individual assessment returns "high", the overall risk is "high"; if the highest is "medium", overall is "medium"; if all are "low", overall is "low".

#### Supported Networks

Full payment data support for: `solana`, `osmosis`, `cosmoshub`, `dydx`, `neutron`, `celestia`, `dymension`, `agoric`, `mantra`, `stride`, `noble`, `union`, `stellar`, and others.

Networks without payment data still benefit from attribution checks and malicious connection analysis, providing limited but valuable risk intelligence.

***

## Query Parameters

| Name               | Type   | Required | Description                                                                 |
| ------------------ | ------ | -------- | --------------------------------------------------------------------------- |
| sender\_address    | string | ✅        | Blockchain address of the sender (minimum 10 characters)                    |
| recipient\_address | string | ✅        | Blockchain address of the recipient (minimum 10 characters)                 |
| amount             | number | ✅        | Payment amount in USD equivalent (must be greater than 0)                   |
| sender\_network    | string | ✅        | Sender's blockchain network (e.g., `solana`, `osmosis`, `ethereum`)         |
| recipient\_network | string | ✅        | Recipient's blockchain network                                              |
| sender\_token      | string | ❌        | Token/denom being sent (optional, enables token risk assessment for Solana) |
| recipient\_token   | string | ❌        | Token/denom being received (optional)                                       |
| timestamp          | string | ❌        | Payment timestamp in ISO 8601 format (e.g., `2025-01-15T10:30:00Z`)         |

**Validation Rules:**

* Sender and recipient addresses must be different
* Amount must be greater than 0
* Address minimum length: 10 characters
* Network minimum length: 3 characters
* Timestamp format: ISO 8601 (if provided)

***

## Response Schema

A successful request returns a JSON object with the following structure:

```json  theme={null}
{
  "overall_risk_level": "high",
  "risk_factors": [
    {
      "factor": "new_wallet_recipient",
      "risk_level": "medium",
      "description": "Recipient is a completely new wallet with no transaction history"
    },
    {
      "factor": "first_interaction",
      "risk_level": "high",
      "description": "First ever interaction between these addresses"
    },
    {
      "factor": "connected_to_malicious_address",
      "risk_level": "high",
      "description": "Sender is 2 hops away from known malicious addresses"
    }
  ],
  "processing_time_ms": 4159.017,
  "errors": [],
  "request_summary": {
    "sender_address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
    "recipient_address": "7UX2i7SucgLMQcfZ75s3VXmZZY4YRUyJN9X1RgfMoDUi",
    "amount": 1000.0,
    "sender_network": "solana",
    "recipient_network": "solana",
    "sender_token": null,
    "recipient_token": null,
    "timestamp": null
  }
}
```

### Field Definitions

* **`overall_risk_level`** (string) – Final risk determination using maximum risk approach. Possible values:

  * `"low"` – Payment appears safe based on all risk factors
  * `"medium"` – Some risk factors detected, proceed with caution
  * `"high"` – Significant risk factors detected, high risk payment
  * `"unknown"` – Unable to assess (unsupported networks with no attribution data)

* **`risk_factors`** (array) – List of individual risk assessments performed. Each factor contains:

  * `factor` (string) – Unique identifier for the risk factor (e.g., `new_wallet_recipient`, `first_interaction`)
  * `risk_level` (string) – Risk level for this specific factor (`"low"`, `"medium"`, `"high"`)
  * `description` (string) – Human-readable explanation of the risk

* **`processing_time_ms`** (number) – Processing time in milliseconds. Typical ranges:

  * Fully supported networks: 1000-3000ms
  * Partially supported: 200-600ms
  * Unsupported networks: 130-500ms

* **`errors`** (array of strings) – List of errors encountered during analysis. Empty array if no errors. May contain informational messages about network support limitations.

* **`request_summary`** (object) – Echo of the original request parameters for verification and logging purposes.

***

## Risk Assessment Details

### Individual Risk Factors

#### 1. New Wallet Detection (Recipient)

**Factor Names:** `new_wallet_recipient`, `established_wallet_recipient`

Analyzes recipient's transaction history to determine if the wallet is newly created or established.

**Risk Levels:**

* **HIGH**: 0 transactions (completely new wallet)
* **MEDIUM**: \< 3 transactions OR first transaction \< 7 days ago
* **LOW**: ≥ 3 transactions AND > 7 days old (established wallet)

**Example Descriptions:**

* `"Recipient is a completely new wallet with no transaction history"`
* `"Recipient has substantial transaction history (500+ transactions over 6 months)"`

***

#### 2. Dormant Wallet Detection (Recipient)

**Factor Names:** `dormant_wallet_recipient`, `active_wallet_recipient`

Checks if recipient has been inactive for an extended period and is now reactivating.

**Risk Levels:**

* **MEDIUM**: Last transaction > 180 days ago (dormant reactivation)
* **LOW**: Recent activity (\< 180 days)

**Example Descriptions:**

* `"Recipient wallet was dormant for 200+ days and is now reactivating"`
* `"Recipient wallet was active within the last 7 days"`

***

#### 3. Address Poisoning Detection (Sender)

**Factor Names:** `address_poisoning_attack`, `no_address_poisoning`

Detects if the recipient address matches poison address patterns associated with the sender.

**Risk Levels:**

* **HIGH**: Recipient matches a poison address pattern (4-char prefix/suffix matching)
* **LOW**: No poisoning pattern detected

**Example Descriptions:**

* `"Potential address poisoning attack detected - recipient matches poison address pattern"`
* `"No address poisoning pattern detected between sender and recipient"`

***

#### 4. Interaction History Analysis (Sender-Recipient Pair)

**Factor Names:** `first_interaction`, `limited_interaction_history`, `established_interaction_history`

Analyzes previous transaction relationships between the sender and recipient addresses.

**Index Selection:**

* Same network: Uses network-specific index (e.g., `payments_solana`)
* Cross-chain: Uses `payments_interchain` index

**Risk Levels:**

* **HIGH**: 0 interactions (first time transacting)
* **MEDIUM**: 1-2 interactions (limited history)
* **LOW**: 3+ interactions (established relationship)

**Example Descriptions:**

* `"First ever interaction between these addresses"`
* `"Limited interaction history: 2 previous interactions found"`
* `"Strong interaction history: 15 previous interactions found"`

***

#### 5. Malicious Connection Analysis (Both)

**Factor Names:**

* Sender: `malicious_connection_sender_direct`, `malicious_connection_sender_high`, `malicious_connection_sender_medium`, `malicious_connection_sender_low`
* Recipient: `malicious_connection_recipient_*` (same pattern)
* Clean: `clean_address_sender`, `clean_address_recipient`

Uses Range Security's ML-powered malicious distance endpoint to identify connections.

**Risk Levels:**

* **HIGH**: 0-2 hops from malicious addresses
* **MEDIUM**: 3 hops from malicious addresses
* **LOW**: 4 hops from malicious addresses OR no connections found

**Example Descriptions:**

* `"Sender is directly connected to known malicious addresses (0 hops)"`
* `"Sender is 2 hops away from known malicious addresses (riskScore: 1)"`
* `"Sender address has no known connections to malicious addresses"`

***

#### 6. Attributed Address Check (Both)

**Factor Names:** `malicious_address_sender`, `malicious_address_recipient`, `attributed_address_sender`, `attributed_address_recipient`, `known_attributed_sender`, `known_attributed_recipient`

Checks addresses against attribution databases for known entities.

**Risk Levels:**

* **HIGH**: Address found with `malicious=True` flag
* **LOW**: Address found with known attribution (exchanges, protocols, system addresses)

**Example Descriptions:**

* `"Address attributed to 'Binance Hot Wallet' (Entity: Binance, Category: Exchange, Role: Hot Wallet)"`
* `"Sender is a known attributed address | identified as 'Token Program' | (entity: Solana) | Category: SYSTEM | Role: Program | ✓ Not flagged as malicious"`

**Note**: This assessment is **network-independent** and runs even for unsupported networks.

***

#### 7 & 8. Token Risk Assessment (Sender/Recipient)

**Factor Names:** `token_risk_sender_low`, `token_risk_sender_medium`, `token_risk_sender_high` (and `_recipient_*` variants)

When `sender_token` or `recipient_token` parameters are provided, evaluates token-specific risk factors.

**Supported Networks:** Currently Solana only

**Risk Levels:** Maps from token risk score to payment risk level (low/medium/high)

**Example Descriptions:**

* `"Sender token EPjFWdd5Au... has low risk (established stablecoin)"`
* `"Recipient token shows medium risk factors"`

***

## Network Support Scenarios

### Fully Supported Networks

Both sender and recipient networks have payment data available.

**Result:** Full risk assessment with all applicable risk factors\
**Processing Time:** \~1000-3000ms\
**Example:** `sender_network=solana, recipient_network=solana`

***

### Partially Supported Networks

One network has payment data, the other doesn't.

**Result:** Limited assessment

* Assessments run for the supported side
* Attribution checks run for both
* Interaction analysis skipped

**Processing Time:** \~200-600ms\
**Errors Array:** Contains limitation messages

***

### Unsupported Networks

Neither network has payment data.

**Result:**

* Returns `overall_risk_level: "unknown"` if no attribution data found
* Attribution check still runs (network-independent)
* Returns actual risk level if malicious addresses found

**Processing Time:** \~130-500ms (fastest, minimal queries)\
**Errors Array:** Contains limitation messages and list of supported networks

***

## Examples

### Example 1: High Risk - First Interaction with New Wallet

```bash  theme={null}
curl -G https://api.range.org/v1/risk/payment \
  --data-urlencode "sender_address=TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA" \
  --data-urlencode "recipient_address=7UX2i7SucgLMQcfZ75s3VXmZZY4YRUyJN9X1RgfMoDUi" \
  --data-urlencode "amount=1000.0" \
  --data-urlencode "sender_network=solana" \
  --data-urlencode "recipient_network=solana"
```

**Response:**

```json  theme={null}
{
  "overall_risk_level": "high",
  "risk_factors": [
    {
      "factor": "new_wallet_recipient",
      "risk_level": "medium",
      "description": "Recipient is a completely new wallet with no transaction history"
    },
    {
      "factor": "first_interaction",
      "risk_level": "high",
      "description": "First ever interaction between these addresses"
    }
  ],
  "processing_time_ms": 2456.78,
  "errors": []
}
```

***

### Example 2: Low Risk - Established Relationship

```bash  theme={null}
curl -G https://api.range.org/v1/risk/payment \
  --data-urlencode "sender_address=DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263" \
  --data-urlencode "recipient_address=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" \
  --data-urlencode "amount=250.0" \
  --data-urlencode "sender_network=solana" \
  --data-urlencode "recipient_network=solana" \
  --data-urlencode "sender_token=So11111111111111111111111111111111111111112" \
  --data-urlencode "timestamp=2025-01-15T10:30:00Z"
```

**Response:**

```json  theme={null}
{
  "overall_risk_level": "low",
  "risk_factors": [
    {
      "factor": "established_wallet_recipient",
      "risk_level": "low",
      "description": "Recipient has substantial transaction history"
    },
    {
      "factor": "established_interaction_history",
      "risk_level": "low",
      "description": "Strong interaction history: 15 previous interactions found"
    }
  ],
  "processing_time_ms": 1876.45
}
```

***

### Example 3: Cross-Chain Payment

```bash  theme={null}
curl -G https://api.range.org/v1/risk/payment \
  --data-urlencode "sender_address=osmo1abc123def456ghi789jkl012mno345pqr678stu" \
  --data-urlencode "recipient_address=cosmos1xyz987uvw654rst321nmo098lkj765ihg432fed" \
  --data-urlencode "amount=5000.0" \
  --data-urlencode "sender_network=osmosis" \
  --data-urlencode "recipient_network=cosmoshub" \
  --data-urlencode "sender_token=OSMO" \
  --data-urlencode "recipient_token=ATOM"
```

**Response:**

```json  theme={null}
{
  "overall_risk_level": "medium",
  "risk_factors": [
    {
      "factor": "first_interaction",
      "risk_level": "high",
      "description": "First cross-chain interaction between these addresses (interchain index)"
    }
  ],
  "processing_time_ms": 3124.78
}
```

***

## Errors

### 400 Bad Request

Invalid request parameters or validation failure.

**Common Causes:**

* Sender and recipient addresses are the same
* Invalid timestamp format
* Amount \< = 0
* Address or network too short

**Example Response:**

```json  theme={null}
{
  "statusCode": 400,
  "message": "Sender and recipient addresses cannot be the same",
  "error": "Bad Request"
}
```

***

### 422 Unprocessable Entity

Validation error in request parameters (FastAPI automatic validation).

***

### 500 Internal Server Error

Unexpected server error during risk assessment.

**Example Response:**

```json  theme={null}
{
  "statusCode": 500,
  "message": "An unexpected error occurred: Connection timeout",
  "error": "Internal Server Error"
}
```

***

## Notes & Best Practices

1. **Maximum Risk Approach**: Overall risk is determined by the highest individual risk factor
2. **Network Validation**: Delegated to ML API - pass through network identifiers as provided
3. **Response Format**: Lowercase risk levels (`"low"`, `"medium"`, `"high"`, `"unknown"`) match ML API format
4. **Error Handling**: Graceful degradation - partial results returned if some assessments fail
5. **Caching**: GET endpoint enables HTTP caching for improved performance
6. **Authentication**: Uses same authentication as other risk endpoints (API key via `Authorization` header)

***

## Use Cases

* **Real-Time Payment Screening**: Risk assessment before payment execution in wallets and exchanges
* **Compliance Monitoring**: AML/KYC risk evaluation for financial institutions
* **Fraud Prevention**: Identify potentially fraudulent payment patterns and address poisoning attacks
* **Security Analysis**: Detect connections to malicious addresses before fund transfers
* **Cross-Chain Risk**: Evaluate risk for cross-chain bridging and swaps

***

## Performance

* **Real-Time**: Designed for sub-3-second processing for fully supported networks
* **Efficient**: GET with query parameters enables CDN/caching for repeated lookups
* **Scalable**: Modular architecture supports future optimizations and parallel assessment execution
* **Network-Dependent**: Processing time varies based on network support level

***

## Related Documents

* **Address Risk Score Endpoint** (`/v1/risk/address`) – Returns risk score for individual addresses
* **Transaction Risk Score Endpoint** (`/v1/risk/transaction`) – Analyzes transaction risk based on involved addresses
* **Token Risk Assessment Endpoint** (`/v1/risk/token`) – Comprehensive Solana token risk analysis
* **Risk API Overview** – General documentation for all risk endpoints and authentication

***

## TypeScript Types (Suggested)

Developers using TypeScript can define types to model the API responses:

```typescript  theme={null}
type PaymentRiskLevel = "low" | "medium" | "high" | "unknown";

interface PaymentRiskFactor {
  factor: string;
  risk_level: PaymentRiskLevel;
  description: string;
}

interface PaymentRequestSummary {
  sender_address: string;
  recipient_address: string;
  amount: number;
  sender_network: string;
  recipient_network: string;
  sender_token: string | null;
  recipient_token: string | null;
  timestamp: string | null;
}

interface PaymentRiskResponse {
  overall_risk_level: PaymentRiskLevel;
  risk_factors: PaymentRiskFactor[];
  processing_time_ms: number;
  errors: string[];
  request_summary: PaymentRequestSummary;
}
```


## OpenAPI

````yaml get /v1/risk/payment
openapi: 3.0.0
info:
  title: Range Risk API
  description: The Range Risk API for risk assessment of crypto addresses.
  version: '1.0'
  contact: {}
servers:
  - url: https://api.range.org
    description: Range API Server
security:
  - Authorization: []
tags:
  - name: Risk
    description: Get risk information about a crypto address.
  - name: Simulator
    description: Simulate a transaction on a network.
paths:
  /v1/risk/payment:
    get:
      tags:
        - Risk
      summary: Get Payment Risk Assessment
      description: >-
        Analyzes cross-chain payments to assess risk using advanced heuristic
        rules and ML-powered analysis. Evaluates sender and recipient addresses
        based on transaction history, behavioral patterns, interaction history,
        address poisoning detection, malicious connections, and security
        indicators.
      operationId: getPaymentRiskAssessment
      parameters:
        - name: sender_address
          required: true
          in: query
          description: Sender blockchain address
          schema:
            example: TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA
            type: string
        - name: recipient_address
          required: true
          in: query
          description: Recipient blockchain address
          schema:
            example: 7UX2i7SucgLMQcfZ75s3VXmZZY4YRUyJN9X1RgfMoDUi
            type: string
        - name: amount
          required: true
          in: query
          description: Payment amount in USD equivalent (must be positive)
          schema:
            minimum: 0.01
            example: 1000
            type: number
        - name: sender_network
          required: true
          in: query
          description: Sender blockchain network (e.g., solana, osmosis, ethereum)
          schema:
            example: solana
            type: string
        - name: recipient_network
          required: true
          in: query
          description: Recipient blockchain network
          schema:
            example: solana
            type: string
        - name: sender_token
          required: false
          in: query
          description: Token/denom being sent (optional, enables token risk assessment)
          schema:
            example: EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
            type: string
        - name: recipient_token
          required: false
          in: query
          description: Token/denom being received (optional)
          schema:
            example: EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
            type: string
        - name: timestamp
          required: false
          in: query
          description: Payment timestamp in ISO 8601 format (optional)
          schema:
            example: '2025-01-15T10:30:00Z'
            type: string
      responses:
        '200':
          description: >-
            Payment risk assessment with individual risk factors and overall
            risk level
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaymentRiskResponse'
components:
  schemas:
    PaymentRiskResponse:
      type: object
      properties:
        overall_risk_level:
          enum:
            - low
            - medium
            - high
            - unknown
          type: string
          description: >-
            Overall risk level determined by maximum risk approach. Possible
            values: low, medium, high, unknown
          example: high
        risk_factors:
          description: List of individual risk assessments performed
          type: array
          items:
            $ref: '#/components/schemas/PaymentRiskFactor'
        processing_time_ms:
          type: number
          description: Processing time in milliseconds
          example: 4159.017
        errors:
          description: List of errors encountered during analysis (empty if no errors)
          type: array
          items:
            type: string
        request_summary:
          description: Echo of the original request parameters for verification
          allOf:
            - $ref: '#/components/schemas/PaymentRequestSummary'
      required:
        - overall_risk_level
        - risk_factors
        - processing_time_ms
        - errors
        - request_summary
    PaymentRiskFactor:
      type: object
      properties:
        risk_context:
          enum:
            - sender
            - recipient
            - interaction
          type: string
          description: >-
            Categorizes whether the risk is related to sender address only,
            recipient address only, or their interaction
          example: recipient
        factor:
          type: string
          description: Unique identifier for the risk factor
          example: new_wallet_recipient
        risk_level:
          enum:
            - low
            - medium
            - high
            - unknown
          type: string
          description: Risk level classification of this factor
          example: medium
        description:
          type: string
          description: Human-readable explanation of the risk factor
          example: Recipient is a new wallet with minimal transaction history
      required:
        - risk_context
        - factor
        - risk_level
        - description
    PaymentRequestSummary:
      type: object
      properties:
        sender_address:
          type: string
          description: Sender blockchain address
          example: TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA
        recipient_address:
          type: string
          description: Recipient blockchain address
          example: 7UX2i7SucgLMQcfZ75s3VXmZZY4YRUyJN9X1RgfMoDUi
        amount:
          type: number
          description: Payment amount in USD equivalent
          example: 1000
        sender_network:
          type: string
          description: Sender blockchain network
          example: solana
        recipient_network:
          type: string
          description: Recipient blockchain network
          example: solana
        sender_token:
          type: string
          nullable: true
          description: Token/denom being sent (optional)
        recipient_token:
          type: string
          nullable: true
          description: Token/denom being received (optional)
        timestamp:
          type: string
          nullable: true
          description: Payment timestamp (optional)
      required:
        - sender_address
        - recipient_address
        - amount
        - sender_network
        - recipient_network
  securitySchemes:
    Authorization:
      type: http
      scheme: bearer
      bearerFormat: API Key
      description: 'Use Authorization: Bearer <api-key>'

````

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.range.org/llms.txt