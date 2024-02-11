
interface DatabaseEntity {

}

export default abstract class EntityAbstract<T extends DatabaseEntity> {
    public abstract create(obj: T) : Promise<T | null>;

    public abstract readById(id: string) : Promise<T>


}