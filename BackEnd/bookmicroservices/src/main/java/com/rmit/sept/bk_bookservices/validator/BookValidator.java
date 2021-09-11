package com.rmit.sept.bk_bookservices.validator;

import com.rmit.sept.bk_bookservices.Repositories.BookRepository;
import com.rmit.sept.bk_bookservices.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.text.SimpleDateFormat;
import java.util.Date;

@Component
public class BookValidator implements Validator {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public boolean supports(Class<?> aClass) {
        return Book.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {
        Book book = (Book) object;

        if (bookRepository.existsById(book.getId())) {
           errors.rejectValue("isbn", "Exists", "This book is already in database");
        }

        //To do
        // NOTE: field, errorCode, default message


        // Make sure that newbook + old book > 0
        if (book.getNumOfNewBook() + book.getNumOfOldBook() <= 0) {
            errors.rejectValue("numOfNewBook", "Zero", "Number of new or old Books should be at least 1");
            errors.rejectValue("numOfOldBook", "Zero", "Number of new or old Books should be at least 1");
        }


        // Release date cannot be a date in the future
        Date currentDate = new Date(System.currentTimeMillis());

        // DEBUGGING HERE
        System.out.println("HERE" + book.getReleaseDate());

        if (book.getReleaseDate().after(currentDate) && !book.getReleaseDate().equals(currentDate)) {
            errors.rejectValue("releaseDate", "Date", "releaseDate must be before the current date");
        }
    }
}
