package com.rmit.sept.bk_bookservices.Repositories;


import com.rmit.sept.bk_bookservices.model.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends CrudRepository<Book, Long> {
//
//    Book findByBookname(String bookname);
//    Book getByISBN(Long ISBN);
}
