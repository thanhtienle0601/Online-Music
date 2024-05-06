package com.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.demo.models.Invoice;

@Repository
public interface InvoiceRepository extends CrudRepository<Invoice, Integer> {
	
	@Query("from Invoice where status = :status")
	public List<Invoice> findByStatus(boolean status);
}
