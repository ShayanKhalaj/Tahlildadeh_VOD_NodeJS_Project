import BoxRepository from "../../../data/repositories/BoxRepository.js";
import BoxSearchModel from "../../../domain/dto/boxes/BoxSearchModel.js";

const repo = new BoxRepository()

const search = async(sm=BoxSearchModel.prototype)=>{
     sm.documentCount = (await repo.getAll()).length
    return await repo.search(paginate(sm))
}

const paginate=(sm=BoxSearchModel.prototype)=>{
    if(sm.documentCount%sm.pageSize===0){
        sm.pageCount=sm.documentCount/sm.pageSize
    }
    if(sm.documentCount%sm.pageSize>0){
        sm.pageCount=(sm.documentCount/sm.pageSize)+1
    }
    return sm
}


export const BoxViewComponent = {search}
