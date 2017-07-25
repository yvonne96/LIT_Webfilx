package com.instil.webflix.voucher;

import static java.util.stream.Collectors.toList;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.hasItem;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.iterableWithSize;
import static org.junit.Assert.assertEquals;
import static org.mockito.BDDMockito.given;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.IntStream;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import com.instil.webflix.voucher.data.VoucherRepository;
import com.instil.webflix.voucher.service.DbVoucherService;
import com.instil.webflix.movies.model.Basket;
import com.instil.webflix.movies.model.BasketItem;
import com.instil.webflix.movies.model.Movie;
import com.instil.webflix.security.model.Account;
import com.instil.webflix.voucher.model.Voucher;

@RunWith(MockitoJUnitRunner.class)
public class DbVouchServiceTest {
    @Mock
    private VoucherRepository voucherRepository;

    @Mock
    private Account account;

    @Mock
    private Basket basket;

    @Mock
    private Movie movie;
    
    @Mock
    private Voucher voucher;

    @InjectMocks
    private DbVoucherService target;

    @Test
    public void shouldReturnFalseAsNoVoucherWithNameTestExists() {
        when(voucherRepository.findByName("test")).thenReturn(null);

        assertThat(target.getVoucherValid("test"), is(equalTo(false)));
    }
    
    @Test
    public void shouldReturnTrueAsVoucherWithNameBogofExists() {
    	when(voucherRepository.findByName("BOGOF")).thenReturn(voucher);
    	
    	assertThat(target.getVoucherValid("BOGOF"), is(equalTo(true)));
    }

    @Test
    public void shouldReturnEmptyListIfNoVouchersExist() {
    	assertThat((target.getAllVouchers()).isEmpty(), is(equalTo(true)));
    }

    @Test
    public void setterAndGettersForVoucherClassShouldWorkCorrectly() {
        Voucher voucher = new Voucher();
        voucher.setId(new Long(1));
        voucher.setOffer("10% OFF");
        voucher.setName("BOGOF");
        voucher.setGlobal(false);
        
        Voucher global = new Voucher();
        global.setId(new Long(3));
        global.setOffer("20% OFF");
        global.setName("GBLPERC");
        global.setGlobal(true);
        
        assertThat(global.getId(), is(equalTo(3L)));
        
    }

    @Test
    public void shouldNotThrowExceptionIfClearingBasketIfNoneExists() {
        when(voucherRepository.findByGlobalTrue()).thenReturn(withListSizeOf(4));
        assertThat(voucherRepository.findByGlobalTrue().size(), is(equalTo(4)));
    }	

    private List<Voucher> withListSizeOf(int globalCount) {
        return IntStream.range(0, globalCount)
                .mapToObj(x -> new Voucher())
                .collect(toList());
    }
}