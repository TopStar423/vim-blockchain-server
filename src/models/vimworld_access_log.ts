import { model, Document, Schema } from 'mongoose';

enum VWAccessLogActionType {
    "PURCHASED_VIM" = 0,
    "FED_VIM" = 1,
    "TRANSFERRED_VIM" = 2
};

interface IVWAccessLog extends Document {
    wallet_address: String;
    action_type:VWAccessLogActionType;
    action_log: String;
    log_timestamp: Date;
    user_ip: String;
    served_from_cache:Boolean;
}

const VWAccessLogSchema = new Schema({
    wallet_address: String,
    action_type:VWAccessLogActionType,
    action_log: String,
    log_timestamp: Date,
    user_ip: String,
    served_from_cache:Boolean,
});

const VWAccessLog = model<IVWAccessLog>('Details', VWAccessLogSchema);

export default VWAccessLog;

