package repository;

import java.util.ArrayList;

public interface RepositoryMethods<T> {
	public void saveAll();
	public ArrayList<T> getAll();
	public T getObj();
	public void create(T obj);
	public void update(T obj);
	public void remove(String id);
	public void save(T obj);
	
}
