package com.demo.services;

import java.util.List;

import com.demo.dtos.InvoiceDto;
import com.demo.models.Invoice;

public interface InvoiceService {
	
	public Invoice find(int id);
	
	public InvoiceDto findByIdDto(int id);
	
	public  List<InvoiceDto> findAll();
	
	public boolean save(InvoiceDto invoiceDto);
	
	public boolean delete(int id);
	
	public List<InvoiceDto> findByStatus(boolean status);
}
