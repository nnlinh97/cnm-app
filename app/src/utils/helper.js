import moment from 'moment';
const BANDWIDTH_PERIOD = 86400;
const MAX_CELLULOSE = 9007199254740991;
const NETWORK_BANDWIDTH = 86400 * 22020096;


export function checkOXY(account, txString64, newTime, OXY = null){
	const txSize = Buffer.from(txString64, 'base64').length;
	const currentTime = newTime;
	let diff = BANDWIDTH_PERIOD;
	if(account.bandwidthTime && +account.sequence !== 1){
		if(moment(currentTime).unix() - moment(account.bandwidthTime).unix() < BANDWIDTH_PERIOD){
			diff = moment(currentTime).unix() - moment(account.bandwidthTime).unix()
		}
	}
	const tempOXY = OXY ? OXY : +account.bandwidth;
	const bandwidthConsume = Math.ceil(Math.max(0, (BANDWIDTH_PERIOD - diff) / BANDWIDTH_PERIOD) * tempOXY + txSize);
	return bandwidthConsume;
}
