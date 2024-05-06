package com.demo.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.dtos.InvoiceDto;
import com.demo.models.Invoice;
import com.demo.repositories.InvoiceRepository;

@Service
public class InvoiceServiceImpl implements InvoiceService {
	
	@Autowired
	private InvoiceRepository invoiceRepository;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public Invoice find(int id) {
		return invoiceRepository.findById(id).get();
	}
	
	@Override
	public InvoiceDto findByIdDto(int id) {
		Invoice invoice = invoiceRepository.findById(id).get();
		return modelMapper.map(invoice, InvoiceDto.class);
	}

	@Override
	public List<InvoiceDto> findAll() {
		return modelMapper.map(invoiceRepository.findAll(), new TypeToken<List<InvoiceDto>>(){}.getType());
	}
	
	@Override
	public List<InvoiceDto> findByStatus(boolean status) {
		return modelMapper.map(invoiceRepository.findByStatus(status), new TypeToken<List<InvoiceDto>>(){}.getType());
	}

	@Override
	public boolean save(InvoiceDto invoiceDto) {
		try {
			Invoice invoice = modelMapper.map(invoiceDto, Invoice.class);
			invoiceRepository.save(invoice);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public boolean delete(int id) {
		try {
			invoiceRepository.deleteById(id);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	
}
