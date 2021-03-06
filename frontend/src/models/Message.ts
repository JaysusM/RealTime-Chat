interface IdKey {
    $oid: String
}

export interface Message {
    _id?: IdKey,
    username: String,
    content: String,
    room: String,
    datetime?: Number
}