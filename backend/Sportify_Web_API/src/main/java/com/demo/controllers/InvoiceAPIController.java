package com.demo.controllers;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.demo.dtos.InvoiceDto;
import com.demo.paypal.PayPalConfig;
import com.demo.services.InvoiceService;
import com.demo.services.PackService;

@RestController
@RequestMapping("api/invoice")
@CrossOrigin(origins = "*")
public class InvoiceAPIController {
	
	@Autowired
	private InvoiceService invoiceService;	
	
	@Autowired
	private PackService packService;
		
	@Autowired
	private Environment env;
	
	@RequestMapping(value = "find/{id}", produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ResponseEntity<InvoiceDto> find(@PathVariable("id") int id){
		try {
			return new ResponseEntity<InvoiceDto>(invoiceService.findByIdDto(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<InvoiceDto>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "findAll", produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ResponseEntity<List<InvoiceDto>> findAll(){
		try {
			System.out.println(LocalDate.now().plusDays(30));
			return new ResponseEntity<List<InvoiceDto>>(invoiceService.findAll(), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<List<InvoiceDto>>(HttpStatus.BAD_REQUEST);
		}
	}	
			
	@RequestMapping(value = "update", consumes = MimeTypeUtils.APPLICATION_JSON_VALUE , produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.PUT)
	public ResponseEntity<Object> update(@RequestBody InvoiceDto invoiceDto){
		try {			
			invoiceDto.setEndDate(getEnddate(invoiceDto.getStartDate(), invoiceDto.getPack_id()));
			invoiceDto.setStatus(true);	
			invoiceDto.setTotal(packService.find(invoiceDto.getPack_id()).getPrice());
			
			return new ResponseEntity<Object>(new Object() {
				public boolean status = invoiceService.save(invoiceDto);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "delete/{id}", produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.DELETE)
	public ResponseEntity<Object> delete(@PathVariable("id") int id){
		try {
			return new ResponseEntity<Object>(new Object() {
				public boolean status = invoiceService.delete(id);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
	}	
	
	@RequestMapping(value = "getPaypalInfo", produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ResponseEntity<PayPalConfig> getPaypalInfo(){
		try {
			PayPalConfig paypalConfig = new PayPalConfig();
			paypalConfig.setAuthToken(env.getProperty("paypal.authtoken"));
			paypalConfig.setBusiness(env.getProperty("paypal.business"));
			paypalConfig.setPosturl(env.getProperty("paypal.posturl"));
			paypalConfig.setReturnurl(env.getProperty("paypal.returnurl"));
			paypalConfig.setClientid(env.getProperty("paypal.clientid"));
			
			return new ResponseEntity<PayPalConfig>(paypalConfig, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<PayPalConfig>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "create", consumes = MimeTypeUtils.APPLICATION_JSON_VALUE , produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<Object> create(@RequestBody InvoiceDto invoiceDto){		
		try {
			invoiceDto.setEndDate(getEnddate(invoiceDto.getStartDate(), invoiceDto.getPack_id()));
			invoiceDto.setStatus(true);	
			invoiceDto.setTotal(packService.find(invoiceDto.getPack_id()).getPrice());
			
			return new ResponseEntity<Object>(new Object() {
				public boolean status = invoiceService.save(invoiceDto);
			}, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
	}	
		
	private Date getEnddate(Date startDate, int packId) {
		Date input = startDate;
		LocalDate date = input.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
		// 30 days
		if(packId == 1) {
			return asDate(date.plusDays(30));				
		}
		// 90 days
		else if(packId == 2) {
			return asDate(date.plusDays(90));
		}
		// 180 days
		else if(packId == 3) {
			return asDate(date.plusDays(180));		
		}
		// 360 days
		else {
			return asDate(date.plusDays(360));		
		}
	}
	
	private Date asDate(LocalDate localDate) {
	    return Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
	}
	
//	private int checkIsPremium(int userId, Date endDate) {
//		User user = userService.find(userId);
//		if(!user.isIspremium()) {
//			return 0;
//		}			
//		return endDate.compareTo(new Date());
//	}	
}
