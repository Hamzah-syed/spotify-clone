export interface IPlaylist {
  collaborative: boolean;
  description?: string;
  external_urls?: any;
  followers?: any;
  href: string;
  id: string;
  images?: IImages;
  name: string;
  owner: IOwner;
  primary_color?: string;
  public: boolean;
  snapshot_id: string;
  tracks: ITracks;
  type: string;
  uri: string;
}

export interface ITracks {
  href: string;
  items: IItems[];
  limit: number;
  next?: string;
  offset: number;
  total: number;
}

export interface IOwner {
  display_name: string;
  external_urls: any;
  href: string;
  id: string;
  type: string;
  uri: string;
}
export interface IImages {
  height: number;
  url: string;
  width: number;
}
export interface IItems {
  added_at: string;
  track: ITrack;
}

export interface ITrack {
  name: string;
  id: string;
  href: string;
  album: IAlbum;
  uri: string;
  duration_ms: number;
  artists: IArtist[];
}

export interface IAlbum {
  name: string;
  images: {
    url: string;
  }[];
}
export interface IArtist {
  name: string;
}
