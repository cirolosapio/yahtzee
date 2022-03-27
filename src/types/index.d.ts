export interface Profile {
  user_id: string
  full_name: string
  avatar_url: string
  online: boolean
  created_at: string
}

export interface Match {
  id: number
  author_id: string
  created_at: string
  author: Profile
}

export type Face = 1|2|3|4|5|6
export type Result = Face[]
export type Choise = '1'|'2'|'3'|'4'|'5'|'6'|'tris'|'poker'|'full'|'smallStair'|'bigStair'|'sium'|'sum'

export interface Shot {
  id: number
  choise: Choise
  result: Result
  value: number
  user_id: string
}
