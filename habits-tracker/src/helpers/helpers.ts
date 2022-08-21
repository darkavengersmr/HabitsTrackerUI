export function dateNow(dayBias: number): string {
    var d = new Date(new Date().setDate(new Date().getDate()+dayBias)),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export function resultToPercentage(result: number): number {
    switch(result) {
        case 0:
            return 0;            
        case 1:
            return 30            
        case 2:
            return 50
        case 3:
            return 80
        case 4:
            return 100
        case 5:
            return 150
        default:
            return 0
      }    
}
 