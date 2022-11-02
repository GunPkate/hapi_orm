import local_dataSource from "../../Mysql/local";

export const jwtValidate = async() => {
    const query:string = 'SELECT * FROM user;' 
    const find:any = await local_dataSource.query(query)
    local_dataSource.createQueryBuilder();
};
