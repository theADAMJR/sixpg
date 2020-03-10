export default interface DBWrapper<DocumentType, DiscordType> {
    get(document: DiscordType): Promise<DocumentType>
    save(document: DocumentType): Promise<DocumentType>
}