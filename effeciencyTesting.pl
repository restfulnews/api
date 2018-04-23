#!/usr/bin/perl
use warnings;
use strict;

# NOTE: Not working yet. Still under development by @lachjones

die "Usage: \n$0 [NewsKeywordFile.txt]\n" if @ARGV < 1;

my $newsTopicsFile = $ARGV[0];
open my $fh, "<", $newsTopicsFile or die "Could not open input file $newsTopicsFile\n";
open my $output, ">", "testResults.txt" or die "Could not open results file testResults.txt\n";

foreach my $line (<$fh>) {
    my @words = split(/[ ,\.\/]/, $line);
    foreach my $word (@words) {
        chomp $word;
        print "$word\n";
    }
}
