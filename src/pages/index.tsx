"use client";

import React from "react";
import { Button, Input, Checkbox, Link, Form, Fieldset } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isVisible, setIsVisible] = React.useState(false);

  const navigate = useNavigate();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    navigate("/dashboard");
    event.preventDefault();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
      {/* Mintlify Atmospheric Gradient */}
      <div className="absolute top-[-20%] left-[-10%] w-[140%] h-[140%] bg-radial-gradient from-brand/10 via-transparent to-transparent opacity-60 pointer-events-none" />

      <div className="z-10 bg-surface-card border border-divider/5 flex w-full max-w-md flex-col gap-8 px-10 py-12 rounded-featured shadow-card backdrop-blur-sm">
        <div className="flex flex-col gap-2">
          <h2 className="text-primary-text text-3xl font-announce tracking-[-0.8px]">
            Welcome back
          </h2>
          <p className="text-[15px] text-tertiary-text font-read">
            Enter your credentials to access your dashboard.
          </p>
        </div>
        <Form
          className="flex flex-col gap-4"
          validationBehavior="native"
          onSubmit={handleSubmit}
        >
          <Fieldset legend="Account Credentials" className="flex flex-col gap-8">
            <Input
              isRequired
              className="text-primary-text"
              label="Email Address"
              labelPlacement="outside"
              name="email"
              placeholder="name@company.com"
              type="email"
              variant="bordered"
              classNames={{
                label: "text-secondary-text font-interact mb-1.5",
                inputWrapper: "h-11 rounded-pill border-divider/10 bg-transparent hover:border-divider/20 focus-within:border-brand/40 transition-all px-4 shadow-none",
                input: "placeholder:text-quaternary-text text-sm"
              }}
            />
            <div className="flex flex-col gap-1">
              <Input
                isRequired
                className="text-primary-text"
                label="Password"
                labelPlacement="outside"
                name="password"
                placeholder="••••••••"
                type={isVisible ? "text" : "password"}
                variant="bordered"
                classNames={{
                  label: "text-secondary-text font-interact mb-1.5",
                  inputWrapper: "h-11 rounded-pill border-divider/10 bg-transparent hover:border-divider/20 focus-within:border-brand/40 transition-all px-4 shadow-none",
                  input: "placeholder:text-quaternary-text text-sm"
                }}
                endContent={
                  <button type="button" onClick={toggleVisibility} className="text-quaternary-text hover:text-brand transition-colors p-1">
                    <Icon
                      className="pointer-events-none text-xl"
                      icon={isVisible ? "lucide:eye-off" : "lucide:eye"}
                    />
                  </button>
                }
              />
              <div className="flex w-full items-center justify-end">
                <Link className="text-brand hover:text-brand-deep mt-4 mb-2 transition-colors text-xs font-interact" href="#">
                  Forgot password?
                </Link>
              </div>
            </div>
          </Fieldset>

          <Button className="w-full bg-foreground hover:opacity-90 text-background font-interact h-11 rounded-pill mt-2 shadow-button transition-all active:scale-[0.98]" type="submit">
            Sign In
          </Button>
        </Form>

        <div className="flex items-center justify-center gap-2 text-sm pt-2 border-t border-divider/5">
          <span className="text-tertiary-text">New to the platform?</span>
          <Link href="#" className="color-brand font-interact hover:underline">
            Contact support
          </Link>
        </div>
      </div>
    </div>
  );
}
