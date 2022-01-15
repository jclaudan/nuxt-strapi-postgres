## Dump Examples

    strapi configuration:dump -f dump.json
    strapi config:dump --file dump.json
    strapi config:dump > dump.json

All these examples are equivalent.

✋ CAUTION

When configuring your application you often enter credentials for third party services (e.g authentication providers). Be aware that those credentials will also be dumped into the output of this command. In case of doubt, you should avoid committing the dump file into a versioning system. Here are some methods you can explore:

    Copy the file directly to the environment you want and run the restore command there.
    Put the file in a secure location and download it at deploy time with the right credentials.
    Encrypt the file before committing and decrypt it when running the restore command.
## Restore Examples

    strapi configuration:restore -f dump.json
    strapi config:restore --file dump.json -s replace
    cat dump.json | strapi config:restore
    strapi config:restore < dump.json

All these examples are equivalent.

Strategies

When running the restore command, you can choose from three different strategies:

    replace: Will create missing keys and replace existing ones.
    merge: Will create missing keys and merge existing keys with their new value.
    keep: Will create missing keys and keep existing keys as is.
