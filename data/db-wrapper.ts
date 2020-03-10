export default interface DBWrapper<DocumentType, DiscordType> {
    get(document: DiscordType): Promise<DocumentType>
}