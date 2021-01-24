import { SpawnSyncOptionsWithBufferEncoding } from "child_process"

export class VIMTierDetailsDto
{
    vim_id:string;
    vim_tier:string;
    vim_tier_id:number;

    constructor(vimId?,vimTier?,vimTierId?)
    {
        if(vimId) this.vim_id = vimId;
        if(vimTier) this.vim_tier = vimTier;
        if(vimTierId >= 0) this.vim_tier_id = vimTierId;
    }
}