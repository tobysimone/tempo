export interface ArtistSettings {
    id: string;
    userId: string;
    name: string;
}

export interface ArtistSettingsDto {
    artistSettings: ArtistSettings;
    userId: string;
}