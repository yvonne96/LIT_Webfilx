package com.instil.webflix.Voucher;

import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.internal.verification.Times;
import org.mockito.runners.MockitoJUnitRunner;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Date;

import com.instil.webflix.voucher.controllers.VoucherRestController;
import com.instil.webflix.voucher.data.VoucherRepository;
import com.instil.webflix.voucher.model.Voucher;
import com.instil.webflix.voucher.service.VoucherService;

@RunWith(MockitoJUnitRunner.class)
public class VoucherRestControllerTest {
	
	@Mock
	Voucher voucherMock;
	
	@Mock
	VoucherRepository vRepositoryMock;
	
	@Mock
	VoucherService vServiceMock;
	
	@Mock
	Date dateMock;
	
	@InjectMocks
	VoucherRestController rest;
	
	@Before
	public void setUp(){
		rest = new VoucherRestController();
		
		MockitoAnnotations.initMocks(this);
	}
	
	@Test
	public void testCallVoucherDelete()
	{
		rest.removeVoucher(1);
		verify(vRepositoryMock,times(1)).deleteById(1);
	}
	
	@Test
	public void testCallToggleGlobal()
	{
		rest.toggleGlobal(1, true);
		verify(vRepositoryMock, times(1)).setAllGlobalFalse();
		verify(vRepositoryMock, times(1)).modifyById(1, true);
	}
	
	@Test
	public void testCallCreateVoucher()
	{
		rest.createVoucher("test", "BUY 1 GET 1 FREE", dateMock);
		verify(vServiceMock, times(1)).createVoucher("test", "BUY 1 GET 1 FREE", dateMock);
	}
	
	@Test
	public void testFormatConversionBuy()
	{
		rest.createVoucher("test", "BUYi1iGETi1iFREE", dateMock);
		verify(vServiceMock, times(1)).createVoucher("test", "BUY 1 GET 1 FREE", dateMock);
	}
	
	@Test
	public void testFormatConversionSpend()
	{
		rest.createVoucher("test", "SPENDi20iGETi10iOFF", dateMock);
		verify(vServiceMock, times(1)).createVoucher("test", "SPEND 20 GET 10 OFF", dateMock);
	}
	
	@Test
	public void testFormatConversionDiscount()
	{
		rest.createVoucher("test", "20piOFF", dateMock);
		verify(vServiceMock, times(1)).createVoucher("test", "20% OFF", dateMock);
	}

}
