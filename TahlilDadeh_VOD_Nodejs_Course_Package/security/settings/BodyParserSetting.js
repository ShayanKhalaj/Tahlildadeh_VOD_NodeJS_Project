import bodyParser from "body-parser"

const parseForm=()=>{
    return bodyParser.urlencoded({extended:true})
}

const parseJson=()=>{
    return bodyParser.json()
}

export const BodyParserSetting = {parseForm,parseJson}