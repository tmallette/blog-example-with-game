export interface BlogPostData {
    title : string, 
    subtitle : string, 
    slug : string,
    category: string,
    date: string
}

export interface GamePostData {
    title : string, 
    subtitle : string, 
    slug : string,
    date: string
}

export interface UnityContextData {
    gameLink:string,
    gameName:string,
    gameVersion:string,
    gameCompany:string
}

export interface PageParams { 
    params: { 
        slug: string 
    } 
}