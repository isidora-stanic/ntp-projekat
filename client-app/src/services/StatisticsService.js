import axios from "axios"

const StatisticsService = {
    getAll : (setLogs) => {
        axios.get("http://localhost:9091/api/statistics").then(
            r => {
                setLogs(r.data)
            }
        ).catch(err => console.error(err))
    },

    getAllByType : (logtype, setLogs) => {
        axios.get("http://localhost:9091/api/statistics/"+logtype.toLowerCase()+"s").then(
            r => {
                setLogs(r.data)
            }
        ).catch(err => console.error(err))
    },

    getCountByTypeForAllProducts : (logtype, setLogs, setTopLogs) => {
        axios.get("http://localhost:9091/api/statistics/statistics-for-all/"+logtype).then(
            r => {
                setLogs(r.data.sort((a,b) => b.stat_count - a.stat_count))
                setTopLogs(r.data.sort((a,b) => b.stat_count - a.stat_count).slice(0, 2))

                console.log(r.data.sort((a,b) => b.stat_count - a.stat_count).slice(0, 10))
            }
        ).catch(err => console.error(err))
    },

    getCountByTypeForAllProductsInterval : (logtype, t1, t2, setLogs, setTopLogs) => {
        axios.get("http://localhost:9091/api/statistics/statistics-for-all-interval/"+logtype+"/"+t1+"/"+t2).then(
            r => {
                setLogs(r.data.sort((a,b) => b.stat_count - a.stat_count))
                setTopLogs(r.data.sort((a,b) => b.stat_count - a.stat_count).slice(0, 2))

                console.log(r.data.sort((a,b) => b.stat_count - a.stat_count).slice(0, 10))
            }
        ).catch(err => console.error(err))
    },

    postLog : (log, logtype) => {
        axios.post("http://localhost:9091/api/statistics/"+logtype.toLowerCase(), log).then(
            r => {
                // console.log(r)
            }
        ).catch(err => console.error(err))
    }
}

export default StatisticsService