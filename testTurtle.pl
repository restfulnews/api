#!/usr/bin/perl
use warnings;
use strict;

print "No args required! Ignoring arguments\n" if @ARGV > 0;

my $companiesFile = "companies.txt";
`echo "" > teamturtle.txt`;

my $j = 0;
for (my $i = 0; $i < 100; $i++) {
    open my $companies, "<", $companiesFile or die "Couldn't open $companiesFile\n";
    foreach my $company (<$companies>) {
        $company =~s/\r//;
        chomp $company;
        `/usr/bin/time --append --output=teamturtle.txt python3 callTurtle.py`;
        $j++;
        print " $j/400\n";
    }
    close $companies;
}

# Collate timing results
my $minSearchTime;
my $maxSearchTime = 0;
open my $searchresults, "<", "teamturtle.txt" or die "Failed to open Search timing results\n";
my $totalSecs = 0;
my $numSearches = 0;
foreach my $line (<$searchresults>) {
    if ($line =~ /user.*system.*elapsed/) {
        $line =~ s/^.*(\d+:\d+\.\d+)elapsed.*$/$1/;
        my $min = $line;
        $min =~ s/(\d+):.+$/$1/;
        $min = $min * 60;
        my $sec = $line;
        $sec =~ s/^.*:(\d+.\d+).*$/$1/;
        $sec = $sec + 0;
        $totalSecs += $min + $sec;
        if (!defined $minSearchTime) {
            $minSearchTime = $sec;
        } elsif ($sec < $minSearchTime) {
            $minSearchTime = $sec;
        }
        if ($sec > $maxSearchTime) {
            $maxSearchTime = $sec;
        }
        $numSearches++;
    }
}
close $searchresults;

`rm teamturtle.txt`;

print "Turtle Results:\n";
printf  "Average Search time:\n%.2f seconds, $numSearches test cases\n", $totalSecs/$numSearches;
printf  "Max Search time:\n%.2f seconds\n", $maxSearchTime;
printf  "Min Search time:\n%.2f seconds\n", $minSearchTime;
