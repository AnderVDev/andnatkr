package com.andnatkr.server.services;

import com.andnatkr.server.domain.auth.AuthenticationRequest;
import com.andnatkr.server.domain.auth.AuthenticationResponse;
import com.andnatkr.server.domain.auth.RegisterRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public interface AuthenticationService {

    AuthenticationResponse register(RegisterRequest request);

    AuthenticationResponse authenticate(AuthenticationRequest request);

    void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException;
}

