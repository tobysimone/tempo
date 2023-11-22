export interface ProfileSettings {
    id: string;
    profilePicture: string;
}

export interface ProfileSettingsDto {
    profileSettings: ProfileSettings;
    profilePictureFileExtension: string;
}