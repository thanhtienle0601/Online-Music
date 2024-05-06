package com.demo.crons;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.demo.dtos.InvoiceDto;
import com.demo.dtos.UserDto;
import com.demo.services.InvoiceService;
import com.demo.services.UserService;

@Component
public class UnactivePremiumAccount {
	
	@Autowired
	InvoiceService invoiceService;
	
	@Autowired
	UserService userService;
	
	@Scheduled(cron = "0 * * * * *")
	public void display() {
		try {
			List<InvoiceDto> invoices = invoiceService.findByStatus(true);
			Calendar c = Calendar.getInstance();

			c.set(Calendar.HOUR_OF_DAY, 0);
			c.set(Calendar.MINUTE, 0);
			c.set(Calendar.SECOND, 0);
			c.set(Calendar.MILLISECOND, 0);
			
			Date today = c.getTime();
			
			for (InvoiceDto invoice : invoices) {
				
				if(invoice.getEndDate().before(today)) {
					UserDto user = userService.findByIdDto(invoice.getUser_id());
					user.setIspremium(false);
					invoice.setStatus(false);
					userService.save(user);
					invoiceService.save(invoice);
				}
			}			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}	
}

