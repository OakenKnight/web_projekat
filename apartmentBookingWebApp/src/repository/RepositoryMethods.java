package repository;

import java.util.List;

public interface RepositoryMethods<T> {
	public boolean saveAll(List<T> objs);
	public List<T> getAll();
	public T getObj(String id);
	public boolean create(T obj);
	public boolean update(T obj);
	public boolean remove(String id);
	
}
