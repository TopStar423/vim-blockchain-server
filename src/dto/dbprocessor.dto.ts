export class DBProcessorDto {
    address: String;
    vims_owned?: Number;
    ehrt_balance?: Number;
    vet_balance?: Number;
    vtho_balance?: Number;
    ehrts_in_vims?: Number;
    vimventory: DBVimVentory[];
    record_blockchain_insert_dt: Date;
    record_blockchain_update_dt: Date;
    record_blockchain_access_dt: Date;

    constructor(){this.ehrt_balance = this.vims_owned = this.vet_balance = this.vtho_balance = this.ehrts_in_vims = 0; this.vimventory = [];}
}

export class DBVimVentory {
    vim_id: Number;
    vim_name: String;
    vim_tier: String;
    vim_tier_id: Number;
    vim_blessings: Number;
    vim_treasures: Number;
    vim_companions: Number;
    vim_age: String;
    vim_image: Buffer;
    vim_created_at: Date;
    vim_lore: String;

    constructor(){this.vim_blessings = this.vim_treasures = this.vim_companions = 0;}
}

export class DBAdopt {
    adoptVIMId: Number;
    emailAddress: String;
    walletAddress: String;
    telegramWechatName: String;
    receiveUpdate: Boolean;
    timestamp: Number;

    constructor(){
        this.adoptVIMId = this.timestamp = 0;
        this.emailAddress = this.walletAddress = this.telegramWechatName = '';
        this.receiveUpdate = false;
    }
}